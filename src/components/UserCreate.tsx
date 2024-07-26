import { User } from "lucide-react"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet"
import { ScrollArea } from "./ui/scroll-area"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import SInput from "./SInput"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import Spinner from "./Spinner"
import { useApplicationStore, useLoggedInUserStore } from "@/common/store"
import { toast } from "./ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

type CProps = {
  openUserCreationCard: boolean,
  setOpenUserCreationCard: React.Dispatch<React.SetStateAction<boolean>>,
  getUsersData: () => Promise<void>,
}

const formSchema = z.object({
  first_name: z.string().min(1, { message: "First name must not be empty" }).max(30, { message: "First name must not exceed 30 characters" }),
  last_name: z.string().min(1, { message: "Last name must not be empty" }).max(30, { message: "Last name must not exceed 30 characters" }),
  email: z.string().min(1, { message: "Email must be at least one character long" }).email("Not a valid email"),
  type: z.string().min(1, { message: "Invalid type" }),
})

const UserCreate = ({ openUserCreationCard, setOpenUserCreationCard, getUsersData }: CProps) => {
  const pb = useApplicationStore(state => state.pb)
  const loggedInUserCommunityId = useLoggedInUserStore(state => state.user.community_id)
  const loggedInUserType = useLoggedInUserStore(state => state.user.type)

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
    // console.log("values: ", values)
    try {
      const createUserData = {
        first_name: values?.first_name,
        last_name: values?.last_name,
        type: values?.type,
        email: values?.email,
        emailVisibility: true,
        password: "skdkoowoieoijja232432nklniaah",
        passwordConfirm: "skdkoowoieoijja232432nklniaah",
        community: loggedInUserCommunityId,
      }
      await pb.collection("users").create(createUserData, {
        fields: "id, first_name, last_name, email, type",
      })
      // console.log("createdUser: ", createdUser)

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

      setOpenUserCreationCard(false)
    } catch (e) {
      // @ts-expect-error expected
      const err = e?.data
      const validationRequired = "validation_required"
      if (err?.code === 400) {
        const errData = err?.data
        if (errData?.password?.code === validationRequired ||
          errData?.passwordConfirm?.code === validationRequired
        ) {
          toast({
            variant: "destructive",
            title: "Failure",
            description: "Passwords do not match"
          })
        }
      }
    } finally {
      setLoading(false)
    }
  }

  if (loggedInUserType !== "director") return <></>

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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email:</FormLabel>
                      <FormControl>
                        <SInput
                          type="text"
                          name="email"
                          placeHolder="Email"
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
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type:</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="focus-visible:ring-0 focus:ring-0">
                            <SelectValue placeholder="Select user type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="regular">Regular</SelectItem>
                        </SelectContent>
                      </Select>
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
    </Sheet >
  )
}

export default UserCreate
