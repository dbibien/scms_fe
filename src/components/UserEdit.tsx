import { Pencil } from "lucide-react"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useApplicationStore } from "@/common/store"
import { useState } from "react"
import { userType } from "@/common/types"
import { toast } from "./ui/use-toast"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { ScrollArea } from "./ui/scroll-area"
import SInput from "./SInput"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Button } from "./ui/button"
import Spinner from "./Spinner"

type CProps = {
  user: userType,
  getUsersData: () => Promise<void>,
}

const formSchema = z.object({
  first_name: z.string().min(1, { message: "First name must not be empty" }).max(30, { message: "First name must not exceed 30 characters" }),
  last_name: z.string().min(1, { message: "Last name must not be empty" }).max(30, { message: "Last name must not exceed 30 characters" }),
  // email: z.string().min(1, { message: "Email must be at least one character long" }).email("Not a valid email"),
  type: z.string().min(1, { message: "Invalid type" }),
})

const UserEdit = ({ user, getUsersData }: CProps) => {
  const pb = useApplicationStore(state => state.pb)

  const [loading, setLoading] = useState(false)
  const [openSheet, setOpenSheet] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      type: user?.type,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    // console.log("values: ", values)
    try {
      const updatedData = {
        first_name: values?.first_name,
        last_name: values?.last_name,
        type: values?.type,
      }
      await pb.collection("users").update(user?.id, updatedData, {
        fields: "id, first_name, last_name, email, type",
      })
      // console.log("createdUser: ", createdUser)

      await getUsersData()

      toast({
        variant: "default",
        title: "Success",
        description: "User updated"
      })

      setOpenSheet(false)
    } catch (e) {
      // @ts-expect-error expected
      const err = e?.data
      const validationRequired = "validation_required"
      let errMessage = "An error occured while updating user"
      if (err?.code === 400) {
        const errData = err?.data
        if (errData?.password?.code === validationRequired ||
          errData?.passwordConfirm?.code === validationRequired
        ) {
          errMessage = "Passwords do not match"
          toast({
            variant: "destructive",
            title: "Failure",
            description: errMessage,
          })
        }
      } else if (err?.code === 404) {
        errMessage = err?.message
        toast({
          variant: "destructive",
          title: "Failure",
          description: errMessage,
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetTrigger>
        <Pencil />
      </SheetTrigger>

      <SheetContent side="bottom">
        <SheetTitle className="text-center">
          Update User
        </SheetTitle>

        <div className="mt-2 pl-2 pr-2 pb-2 lg:w-[50%] lg:mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">

              <ScrollArea className="h-[40vh]">
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
                          <SelectItem value="director">Director</SelectItem>
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
                  {loading ? <Spinner /> : "Update User"}
                </Button>
              </div>
            </form>
          </Form>
        </div>

      </SheetContent>
    </Sheet>
  )
}

export default UserEdit
