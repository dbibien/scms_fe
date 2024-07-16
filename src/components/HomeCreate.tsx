import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Home } from "lucide-react"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet"
import { ScrollArea } from "./ui/scroll-area"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import SInput from "./SInput"
import { Button } from "./ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Spinner from "./Spinner"
import { useState } from "react"
import STextArea from "./STextArea"
import { Separator } from "./ui/separator"
import { Switch } from "./ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { useApplicationStore, useLoggedInUserStore } from '@/common/store'

type CProps = {
  openHomeCreationCard: boolean,
  setOpenHomeCreationCard: React.Dispatch<React.SetStateAction<boolean>>,
  showCreationButton?: boolean,
  buttonFull?: boolean,
}

const formSchema = z.object({
  address: z.string().min(1, "Address must be longer than a character").max(100, "Address must not exceed 100 characters "),
  apt: z.string().min(1, { message: "Apt. must be at least 1 character long" }).max(100, { message: "Apt. must not exceed 100 characters" }).optional(),
  city: z.string().min(1, { message: "City must be at least 1 character long" }).max(100, { message: "City must not exceed 100 characters" }),
  zip: z.string().min(1, { message: "Zip must be at least 1 character longk" }).max(100, { message: "Zip must not exceed 100 characters" }),
  note: z.string().max(256, { message: "Note must not exceed 256 characters" }).optional(),
  member_number: z.string().max(14, { message: "Member number must not exceed 14 characters" }).optional(),
  security_code: z.string().max(8, { message: "Security code must not exceed 8 characters" }).optional(),

  first_name: z.string().max(30, { message: "First name must not exceed 30 characters" }).optional(),
  last_name: z.string().max(30, { message: "Last name must not exceed 30 characters" }).optional(),
  owner: z.boolean().optional(),

  type: z.string().optional(),
  primary: z.boolean().optional(),

  report: z.string().max(256, { message: "Note must not exceed 256 characters" }).optional(),
  // password: z.string().min(8, { message: "Password must be between 8 and 24 characters" }).max(24, { message: "Password must be between 8 and 24 characters" }),
})

const HomeCreate = ({ openHomeCreationCard, setOpenHomeCreationCard, showCreationButton = true, buttonFull = false }: CProps) => {
  const pb = useApplicationStore(state => state.pb)
  const loggedInUserCommunityId = useLoggedInUserStore(state => state.user.community_id)

  const [loading, setLoading] = useState(false)
  const [phoneInputValue, setPhoneInputValue] = useState(undefined)
  const [newHomeId, setNewHomeId] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   name: concern?.name,
    //   hint: concern?.hint,
    //   say: concern?.say?.replace("<p>", "").replace("</p>", ""),
    // },
  })

  const handleHouseCreationSuccess = (createdHouse) => {
    console.log("createdHouse: ", createdHouse)
    setNewHomeId(createdHouse?.id)

    const residentData = {
      first_name: "",
    }
    return pb.collection('residents').create(data);
  }
  const handleHouseCreationFailed = (tragic) => {
    console.log("tragic: ", tragic)
  }
  const handleResidentCreationSuccess = (createdResident) => {
    console.log("createdResident: ", createdResident)
  }
  const handleResidentCreationFailed = (tragic) => {
    console.log("createdResident: ", tragic)
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("values: ", values)

    // pb.collection("houses").create(createHouseData)
    //   .then(handleHouseCreationSuccess, handleHouseCreationFailed)
    //   .then(handleResidentCreationSuccess, handleResidentCreationFailed)


    // pb.collection("houses").create(createHouseData)
    //   .then((value) => {
    //     setNewHomeId(value?.id)
    //     const residentData = {
    //       first_name: values?.first_name,
    //       last_name: values?.last_name,
    //       owner: values?.owner,
    //       house: newHomeId,
    //     }
    //     pb.collection("residents").create(residentData)
    //   })
    //   .then((value) => console.log("value: ", value))
    //   .catch((e) => console.log("e: ", e))

    try {
      const createHouseData = {
        address: values.address,
        apt: values.apt,
        city: values.city,
        zip: values.zip,
        note: values.note,
        member_number: values.member_number,
        security_code: values.security_code,
        community: loggedInUserCommunityId,
      }
      const createdHouse = await pb.collection("houses").create(createHouseData)
      setNewHomeId(createdHouse?.id)

      if (values?.first_name && values?.last_name) { // note: it is not required for a resident to be created at the time of home creation. Only create a resident if first and last names are provided
        const residentData = {
          first_name: values?.first_name,
          last_name: values?.last_name,
          owner: values?.owner,
          // house: newHomeId,
          house: createdHouse?.id,
        }
        const createdResident = await pb.collection("residents").create(residentData)
        console.log("createdResident: ", createdResident)
      }

      if (phoneInputValue) {
        const phoneData = {
          phone_number: phoneInputValue,
          primary: values?.primary,
          type: values?.type,
          house: createdHouse?.id
        }
        const createdPhone = await pb.collection("phones").create(phoneData)
        console.log("createdResident: ", createdPhone)
      }

    } catch (e) {
      console.log("created house error: ", e)
    }

    // try {
    //   const residentData = {
    //     first_name: values?.first_name,
    //     last_name: values?.last_name,
    //     owner: values?.owner,
    //     house: newHomeId,
    //   }
    //   const createdResident = await pb.collection("residents").create(residentData)
    //   console.log("createdResident: ", createdResident)
    // } catch (e) {
    //   console.log("create resident error: ", e)
    // }
  }

  console.log("newHomeId: ", newHomeId)
  console.log("phone", phoneInputValue)

  return (
    <div className={`${buttonFull && "w-full"}`}>
      {showCreationButton && (
        <Sheet open={openHomeCreationCard} onOpenChange={setOpenHomeCreationCard} >
          <SheetTrigger className={`${buttonFull && "w-full"}`}>
            <Button className="flex items-end gap-2">
              <Home />
              Add Home
            </Button>
          </SheetTrigger>

          <SheetContent side="bottom">
            <SheetTitle className="text-center">
              Add Home
            </SheetTitle>

            <div className="mt-2 pl-2 pr-2 pb-2 lg:w-[50%] lg:mx-auto">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">

                  <ScrollArea className="h-[70vh]">
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

                    <Separator orientation="horizontal" className="mt-8 mb-6" />

                    <p className="text-md font-bold mb-2">Phone</p>

                    <div>
                      <p className="text-sm font-medium mb-2">Phone:</p>
                      <PhoneInput
                        defaultCountry='US'
                        placeholder="Enter phone number"
                        value={phoneInputValue}
                        onChange={setPhoneInputValue}
                        className="border border-slate-200 p-2 rounded-md focus-visible:outline-red-100"
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type:</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
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

                    <Separator orientation="horizontal" className="mt-8 mb-6" />

                    <p className="text-md font-bold mb-2">Report</p>

                    <FormField
                      control={form.control}
                      name="report"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Report:</FormLabel>
                          <FormControl>
                            <STextArea
                              name="report"
                              placeHolder="Write a report for this home..."
                              helperText=""
                              styles="h-40"
                              fields={field}
                            />
                          </FormControl>
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
                      {loading ? <Spinner /> : "Create home"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  )
}

export default HomeCreate
