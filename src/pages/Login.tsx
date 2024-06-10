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


const formSchema = z.object({
  email: z.string().min(2),
  password: z.string().min(8).max(24),
})

const LoginPage = () => {
  // Defining form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // Defining submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <>
      <div className="bg-black h-[40vh] flex justify-center items-end">
        <p className="text-white text-3xl font-bold">SCMS</p>
      </div>

      <div className="p-2 pt-8 md:max-w-[50%] md:m-auto">
        <p className="text-center text-xl">Log in to manage your community</p>


        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-8">
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

            <Button type="submit" className="w-full mt-8" > Login</Button>
          </form>
        </Form>

      </div>
    </>
  )
}

export default LoginPage 
