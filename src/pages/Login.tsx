import SInput from "@/components/SInput"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Ban } from "lucide-react"
import { useApplicationStore } from "@/common/store"

// login page zod schema
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be between 8 and 24 characters" }).max(24, { message: "Password must be between 8 and 24 characters" }),
})

const LoginPage = () => {
  const pb = useApplicationStore(state => state.pb)

  const [errorMessage, setErrorMessage] = useState("")

  const navigate = useNavigate()

  // do not allow users to navigate to the login page when they are already logged in 
  useEffect(() => {
    if (pb.authStore.isValid) {
      return navigate("/")
    }
  }, [])


  // Defining form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const authenticateUser = async (values: z.infer<typeof formSchema>) => {
    try {
      const authData = await pb.collection('users').authWithPassword(
        values.email,
        values.password,
      )

      console.log("authData: ", authData)

      if (authData?.record?.id) {
        // user is logged in
        setErrorMessage("")
        return navigate("/")
      }
    } catch (e) {
      console.log("e: ", e)
      setErrorMessage("Error authenticating")
    }
  }

  // Defining submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    authenticateUser(values)
  }

  return (
    <>
      <div className="bg-black h-[40vh] flex justify-center items-end">
        <p className="text-white text-3xl font-bold">SCMS</p>
      </div>

      <div className="p-2 pt-8 md:max-w-[50%] md:m-auto">
        <p className="text-center text-xl">Log in to manage your community</p>

        {errorMessage && (
          <div className="bg-red-200 mt-4 p-4 rounded-md">
            <Ban color="red" />
            <p className="text-center">{errorMessage}</p>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <SInput
                      type="email"
                      name="email"
                      placeHolder="email"
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <SInput
                      type="password"
                      name="password"
                      placeHolder="password"
                      styles=""
                      fields={field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-8">
              <Button type="submit" className="w-full mt-4"> Login</Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  )
}

export default LoginPage 
