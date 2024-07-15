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

type CProps = {
  openHomeCreationCard: boolean,
  setOpenHomeCreationCard: React.Dispatch<React.SetStateAction<boolean>>,
  showCreationButton: boolean,
}

const formSchema = z.object({
  address: z.string().min(1, "Address must be longer than a character").max(100, "Address must not exceed 100 characters "),
  apt: z.string().min(1, { message: "Apt. must be at least 1 character long" }).max(100, { message: "Apt. must not exceed 100 characters" }),
  city: z.string().min(1, { message: "City must be at least 1 character long" }).max(100, { message: "City must not exceed 100 characters" }),
  zip: z.string().min(1, { message: "Zip must be at least 1 character longk" }).max(100, { message: "Zip must not exceed 100 characters" }),
  note: z.string().max(256, { message: "Note must not exceed 256 characters" }),

  first_name: z.string().max(30, { message: "First name must not exceed 30 characters" }),
  last_name: z.string().max(30, { message: "Last name must not exceed 30 characters" }),
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
                          <FormLabel>Note</FormLabel>
                          <FormControl>
                            <STextArea
                              name="note"
                              placeHolder="Note"
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
