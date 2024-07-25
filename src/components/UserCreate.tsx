import { User } from "lucide-react"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet"
import { ScrollArea } from "./ui/scroll-area"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import SInput from "./SInput"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import STextArea from "./STextArea"
import Spinner from "./Spinner"
import { Separator } from "./ui/separator"
import { useApplicationStore, useLoggedInUserStore } from "@/common/store"
import { toast } from "./ui/use-toast"

type CProps = {
  openUserCreationCard: boolean,
  setOpenUserCreationCard: React.Dispatch<React.SetStateAction<boolean>>,
  getUsersData: () => Promise<void>,
}

const formSchema = z.object({
  first_name: z.string().max(30, { message: "First name must not exceed 30 characters" }),
  last_name: z.string().max(30, { message: "Last name must not exceed 30 characters" }),
  email: z.string().min(1, { message: "Email must be at least one character long" }).email("Not a valid email"),
  type: z.string(),
})

const UserCreate = ({ openUserCreationCard, setOpenUserCreationCard, getUsersData }: CProps) => {
  const pb = useApplicationStore(state => state.pb)
  const loggedInUserCommunityId = useLoggedInUserStore(state => state.user.community_id)

  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      type: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    console.log("values: ", values)
    try {
      const createUserData = {
        first_name: values?.first_name,
        last_name: values?.last_name,
        email: values?.email,
        type: values?.type,
        community: loggedInUserCommunityId,
      }
      const createdUser = await pb.collection("users").create(createUserData)
      console.log("createdUser: ", createdUser)

      await getUsersData()
      form.reset({
        first_name: "",
        last_name: "",
        email: "",
        type: "",
      })

      toast({
        variant: "default",
        title: "Success",
        description: "New user added"
      })
    } catch (e) {
      // @ts-expect-error expected
      const err = e?.data
      const validationNotUniqueCode = "validation_not_unique"
      if (err?.code === 400) {
        const errData = err?.data
        if (errData?.address?.code === validationNotUniqueCode ||
          errData?.city?.code === validationNotUniqueCode ||
          errData?.state?.code === validationNotUniqueCode ||
          errData?.zip?.code === validationNotUniqueCode
        ) {
          toast({
            variant: "destructive",
            title: "Failure",
            description: "Home already exists"
          })
        }
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Sheet open={openUserCreationCard} onOpenChange={setOpenUserCreationCard} >
      <SheetTrigger>
        <Button className="flex items-end gap-2">
          <User />
          Add User
        </Button>
      </SheetTrigger>

      <SheetContent side="bottom">
        <SheetTitle className="text-center">
          Add User
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

                {/*@ts-expect-error yah */}
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
                  {loading ? <Spinner /> : "Add User"}
                </Button>
              </div>
            </form>
          </Form>
        </div>

      </SheetContent>
    </Sheet>
  )
}

export default UserCreate
