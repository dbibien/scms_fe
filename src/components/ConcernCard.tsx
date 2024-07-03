import { concernCardType } from "@/common/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Pen } from "lucide-react"
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
import SInput from "./SInput"
import { Button } from "./ui/button"

const formSchema = z.object({
  name: z.string().min(1, "Field must be longer than a character").max(24, "Field must not exceed 24 characters "),
  hint: z.string().min(1, { message: "Field must be 1 character long" }).max(32, { message: "Field must not exceed 32 characters" }),
  say: z.string().min(1, { message: "Field must be 1 character long" }).max(256, { message: "Field must not exceed 256 characters" }),
  // password: z.string().min(8, { message: "Password must be between 8 and 24 characters" }).max(24, { message: "Password must be between 8 and 24 characters" }),
})

const ConcernCard = ({ concern }: concernCardType) => {
  const handleUpdateConcern = () => { }

  // Defining form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: concern?.name,
      hint: concern?.hint,
      say: concern?.say?.replace("<p>", "").replace("</p>", ""),
    },
  })


  // Defining submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    handleUpdateConcern(values)
  }

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{concern?.name}</CardTitle>
        <CardDescription>{concern?.hint}</CardDescription>
      </CardHeader>

      <CardContent>
        <p>{concern?.say.replace("<p>", "").replace("</p>", "")}</p>
      </CardContent>

      <CardFooter>
        <Sheet>
          <SheetTrigger className="flex gap-2 items-center text-slate-500 hover:text-black">
            <Pen />
            <p>Edit</p>
          </SheetTrigger>

          <SheetContent side="bottom">
            <SheetTitle className="text-center">
              {concern?.name}
            </SheetTitle>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <SInput
                          type="text"
                          name="name"
                          placeHolder="name"
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
                  name="hint"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hint</FormLabel>
                      <FormControl>
                        <SInput
                          type="text"
                          name="hint"
                          placeHolder="hint"
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
                  name="say"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Say</FormLabel>
                      <FormControl>
                        <SInput
                          type="text"
                          name="say"
                          placeHolder="say"
                          styles=""
                          fields={field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="mt-8">
                  <Button type="submit" className="w-full mt-4">Update concern</Button>
                </div>
              </form>
            </Form>
          </SheetContent>
        </Sheet>
      </CardFooter>
    </Card>
  )
}

export default ConcernCard
