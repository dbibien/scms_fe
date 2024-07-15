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

type CProps = {
  openHomeCreationCard: boolean,
  setOpenHomeCreationCard: React.Dispatch<React.SetStateAction<boolean>>,
  showCreationButton: boolean,
}

const formSchema = z.object({
  name: z.string().min(1, "Field must be longer than a character").max(100, "Field must not exceed 24 characters "),
  hint: z.string().min(1, { message: "Field must be 1 character long" }).max(200, { message: "Field must not exceed 32 characters" }),
  say: z.string().min(1, { message: "Field must be 1 character long" }).max(256, { message: "Field must not exceed 256 characters" }),
  // password: z.string().min(8, { message: "Password must be between 8 and 24 characters" }).max(24, { message: "Password must be between 8 and 24 characters" }),
})

const HomeCreate = ({ openHomeCreationCard, setOpenHomeCreationCard, showCreationButton }: CProps) => {

  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   name: concern?.name,
    //   hint: concern?.hint,
    //   say: concern?.say?.replace("<p>", "").replace("</p>", ""),
    // },
  })

  const onSubmit = () => { }

  return (
    <div>
      {showCreationButton && (
        <Sheet open={openHomeCreationCard} onOpenChange={setOpenHomeCreationCard} >
          <SheetTrigger>
            <Button className="flex items-end gap-2">
              <Home />
              Add Home
            </Button>
          </SheetTrigger>

          <SheetContent>
            <SheetTitle>
              Add Home
            </SheetTitle>

            <div className="mt-2 pl-2 pr-2 pb-2 lg:w-[50%] lg:mx-auto">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">

                  <ScrollArea className="h-[70vh]">

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
