import { Pencil } from "lucide-react"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet"
import { useState } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import SInput from "./SInput"
import StateSelector from "./StateSelector"
import STextArea from "./STextArea"
import { Separator } from "./ui/separator"
import { Switch } from "./ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import Spinner from "./Spinner"
import PhoneInput from 'react-phone-number-input'
import { useApplicationStore, useLoggedInUserStore } from '@/common/store'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "./ui/use-toast"
import { houseType } from "@/common/types"
import { ScrollArea } from "./ui/scroll-area"
import HomeAddress from "./HomeAddress"

type CProps = {
  house: houseType,
  getHomeData: () => Promise<void>,
}

const formSchema = z.object({
  address: z.string().min(1, "Address must be longer than a character").max(100, "Address must not exceed 100 characters "),
  apt: z.string().max(100, { message: "Apt. must not exceed 100 characters" }).optional(),
  city: z.string().min(1, { message: "City must be at least 1 character long" }).max(100, { message: "City must not exceed 100 characters" }),
  state: z.string().min(2, { message: "State must be selected" }),
  zip: z.string().min(1, { message: "Zip must be at least 1 character longk" }).max(100, { message: "Zip must not exceed 100 characters" }),
  note: z.string().max(256, { message: "Note must not exceed 256 characters" }).optional(),
  member_number: z.string().max(14, { message: "Member number must not exceed 14 characters" }).optional(),
  security_code: z.string().max(8, { message: "Security code must not exceed 8 characters" }).optional(),

  first_name: z.string().max(30, { message: "First name must not exceed 30 characters" }).optional(),
  last_name: z.string().max(30, { message: "Last name must not exceed 30 characters" }).optional(),
  owner: z.boolean().optional(),

  type: z.string().optional(),
  primary: z.boolean().optional(),
  house_check: z.boolean().optional(),
  house_check_start_date: z.string(),
  house_check_end_date: z.string(),

  // report: z.string().max(256, { message: "Note must not exceed 256 characters" }).optional(),
  // password: z.string().min(8, { message: "Password must be between 8 and 24 characters" }).max(24, { message: "Password must be between 8 and 24 characters" }),
}).refine((data) => {
  if (data.house_check && data.house_check_start_date === "") return false

  if (data?.house_check && data?.house_check_end_date === "") return false
})

const HomeUpdate = ({ house, getHomeData }: CProps) => {
  const pb = useApplicationStore(state => state.pb)
  const loggedInUserCommunityId = useLoggedInUserStore(state => state.user.community_id)
  // const loggedInUserId = useLoggedInUserStore(state => state.user.id)

  const [loading, setLoading] = useState(false)
  // const [phoneInputValue, setPhoneInputValue] = useState(undefined)
  const [openHomeUpdateCard, setOpenHomeUpdateCard] = useState(false)

  const resident = house?.residents?.map(res => ({
    id: res?.id,
    first_name: res?.first_name,
    last_name: res?.last_name,
    owner: res?.owner
  }))

  const phone = house?.phones?.map(phn => ({
    id: phn?.id,
    phone_number: phn?.phone_number,
    primary: phn?.primary,
    type: phn?.type,
  }))

  const [phoneInputValue, setPhoneInputValue] = useState(phone[0]?.phone_number)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: house?.address,
      apt: house?.apt,
      city: house?.city,
      state: house?.state,
      zip: house?.zip,
      note: house?.note,
      member_number: house?.member_number,
      security_code: house?.security_code,
      first_name: resident.length > 0 ? resident[0].first_name : "",
      last_name: resident.length > 0 ? resident[0].last_name : "",
      owner: resident.length > 0 ? resident[0].owner : false,
      type: phone.length > 0 ? phone[0].type : "",
      primary: phone.length > 0 ? phone[0].primary : false,
      house_check: house?.house_ckeck,
      // report: "",
    },
  })

  const watchFirstName = form.watch("first_name")
  const watchLastName = form.watch("last_name")

  // useEffect(() => {
  //   const getPhoneNumber = async () => {
  //     // console.log("getting phone number")
  //     try {
  //       const record = await pb.collection('phones').getFirstListItem(`house = "${house?.id}"`, {
  //         fields: "id, phone_number, primary, type"
  //       })
  //
  //       console.log("record: ", record)
  //       setPhoneInputValue(record?.phone_number)
  //     } catch (e) {
  //       // @ts-expect-error this is fine
  //       console.log("e: ", e.data)
  //     }
  //   }
  //
  //   if (openHomeUpdateCard) getPhoneNumber()
  // }, [openHomeUpdateCard])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    // console.log("values: ", values)
    try {
      const updateHouseData = {
        address: values.address,
        apt: values.apt,
        city: values.city,
        state: values?.state,
        zip: values.zip,
        note: values.note,
        member_number: values.member_number,
        security_code: values.security_code,
        community: loggedInUserCommunityId,
      }
      const updatedHouse = await pb.collection("houses").update(house?.id, updateHouseData)

      if (values?.first_name && values?.last_name) { // note: it is not required for a resident to be created at the time of home creation. Only create a resident if first and last names are provided
        const residentData = {
          first_name: values?.first_name,
          last_name: values?.last_name,
          owner: values?.owner,
          house: updatedHouse?.id,
        }
        if (resident.length > 0) {
          await pb.collection("residents").update((resident.length > 0 ? resident[0]?.id : ""), residentData)
        } else {
          await pb.collection("residents").create(residentData)
        }
      }

      if (phoneInputValue) {
        const phoneData = {
          phone_number: phoneInputValue,
          primary: values?.primary,
          type: values?.type,
          house: updatedHouse?.id
        }
        if (phone.length > 0) {
          await pb.collection("phones").update((phone.length > 0 ? phone[0]?.id : ""), phoneData)
        } else {
          await pb.collection("phones").create(phoneData)
        }
      }

      // if (values?.report) {
      //   await pb.collection("reports").create({
      //     note: values?.report,
      //     created_by: loggedInUserId,
      //     // type: ""  TODO: figure out what to do about the type field
      //     house: createdHouse?.id,
      //   })
      // }

      await getHomeData()
      // form.reset({
      //   address: "",
      //   apt: "",
      //   city: "",
      //   zip: "",
      //   note: "",
      //   member_number: "",
      //   security_code: "",
      //   first_name: "",
      //   last_name: "",
      //   owner: false,
      //   type: "",
      //   primary: false,
      //   // report: "",
      // })
      // setPhoneInputValue(undefined)
      setOpenHomeUpdateCard(false)
      toast({
        variant: "default",
        title: "Success",
        description: "Home updated"
      })
    } catch (e) {
      // @ts-expect-error expected
      const err = e?.data
      let errMessage = ""
      if (err?.code === 400) {
        const errData = err?.data
        for (const key in errData) {
          errMessage += key + ": " + errData[key].message + ". "
        }
        toast({
          variant: "destructive",
          title: "Failure",
          description: errMessage,
        })
      } else {
        toast({
          variant: "destructive",
          title: "Failure",
          description: err?.message,
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Sheet open={openHomeUpdateCard} onOpenChange={setOpenHomeUpdateCard}>
      <SheetTrigger>
        <Pencil />
      </SheetTrigger>

      <SheetContent side="bottom">
        <SheetTitle className="text-center">
          Update Home
        </SheetTitle>
        <HomeAddress house={house} />

        <div className="mt-2 pl-2 pr-2 pb-2 lg:w-[50%] lg:mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">

              <ScrollArea className="h-[55vh]">
                <p className="text-md font-bold mb-2">Home</p>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address:</FormLabel>
                      <FormControl>
                        <SInput
                          type="text"
                          name="address"
                          placeHolder="Address"
                          styles=""
                          fields={field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="apt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apt, Suite, etc:</FormLabel>
                      <FormControl>
                        <SInput
                          type="text"
                          name="apt"
                          placeHolder="Apt, Suite, etc"
                          styles=""
                          fields={field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City:</FormLabel>
                      <FormControl>
                        <SInput
                          type="text"
                          name="city"
                          placeHolder="City"
                          styles=""
                          fields={field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <StateSelector control={form.control} name="state" />

                <FormField
                  control={form.control}
                  name="zip"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ZIP/ Post code:</FormLabel>
                      <FormControl>
                        <SInput
                          type="text"
                          name="zip"
                          placeHolder="Zip"
                          styles=""
                          fields={field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Note:</FormLabel>
                      <FormControl>
                        <STextArea
                          name="note"
                          placeHolder="Write a note for this home..."
                          helperText=""
                          styles="h-40"
                          fields={field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator orientation="horizontal" className="mt-8 mb-6" />

                <p className="text-md font-bold mb-2">Resident</p>

                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name:</FormLabel>
                      <FormControl>
                        <SInput
                          type="text"
                          name="first_name"
                          placeHolder="First name"
                          styles=""
                          fields={field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name:</FormLabel>
                      <FormControl>
                        <SInput
                          type="text"
                          name="last_name"
                          placeHolder="Last name"
                          styles=""
                          fields={field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/*@ts-expect-error yah */}
                {watchFirstName?.length > 0 && watchLastName?.length > 0 && (
                  <>
                    <FormField
                      control={form.control}
                      name="owner"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-2 mt-4">
                            <FormLabel>Owner:</FormLabel>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="member_number"
                      render={({ field }) => (
                        <FormItem className='mt-4'>
                          <FormLabel>Member number:</FormLabel>
                          <FormControl>
                            <SInput
                              type="text"
                              name="member_number"
                              placeHolder="Member number"
                              styles=""
                              fields={field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="security_code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Security code:</FormLabel>
                          <FormControl>
                            <SInput
                              type="text"
                              name="security_code"
                              placeHolder="Security code"
                              styles=""
                              fields={field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                <Separator orientation="horizontal" className="mt-8 mb-6" />

                <p className="text-md font-bold mb-2">Phone</p>

                <div>
                  <p className="text-sm font-medium mb-2">Phone:</p>
                  <PhoneInput
                    defaultCountry='US'
                    placeholder="Enter phone number"
                    value={phoneInputValue}
                    // @ts-expect-error look into the types at a later time
                    onChange={setPhoneInputValue}
                    className="border border-slate-200 p-2 rounded-md"
                  />
                </div>

                {phoneInputValue?.length > 0 && (
                  <>
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type:</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="focus-visible:ring-0 focus:ring-0">
                                <SelectValue placeholder="Select phone type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="cell">Cell</SelectItem>
                              <SelectItem value="home">Home</SelectItem>
                              <SelectItem value="business">Business</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="primary"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-2 mt-4">
                            <FormLabel>Primary:</FormLabel>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}


                <Separator orientation="horizontal" className="mt-8 mb-6" />

                <p className="text-md font-bold mb-2">House check</p>

                <FormField
                  control={form.control}
                  name="house_check"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2 mt-4">
                        <FormLabel>House check:</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />


              </ScrollArea>

              <div className="mt-8">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4"
                >
                  {loading ? <Spinner /> : "Update Home"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default HomeUpdate
