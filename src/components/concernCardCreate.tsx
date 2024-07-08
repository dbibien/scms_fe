
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
import STextArea from "./STextArea"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Plus } from "lucide-react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ScrollArea } from "./ui/scroll-area"
import { useApplicationStore, useCommunityStore, useLoggedInUserStore } from "@/common/store"
import { useToast } from "./ui/use-toast"
import { useState } from "react"
import Spinner from "./Spinner"

const formSchema = z.object({
  name: z.string().min(1, "Field must be longer than a character").max(100, "Field must not exceed 24 characters "),
  hint: z.string().min(1, { message: "Field must be 1 character long" }).max(200, { message: "Field must not exceed 32 characters" }),
  say: z.string().min(1, { message: "Field must be 1 character long" }).max(256, { message: "Field must not exceed 256 characters" }),
})

const ConcernCardCreate = () => {
  const pb = useApplicationStore(state => state.pb)
  const loggedInUserId = useLoggedInUserStore(state => state.user.id)
  const concerns = useCommunityStore(state => state.concerns)
  const setConcerns = useCommunityStore(state => state.setConcerns)

  const [openSheet, setOpenSheet] = useState(false)
  const [loading, setLoading] = useState(false)

  const greeting = "Hello. This is Boca Woods Security."
  const goodBye = "Thank you. Good bye."

  const { toast } = useToast()

  const handleCreateConcern = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    try {
      const data = {
        name: values.name,
        hint: values.hint,
        say: values.say,
        added_by: loggedInUserId,
        community: "06lxu8o5fjppepj",
      }
      const createdConcern = await pb.collection('concerns').create(data, {
        fields: "id, name, hint, say"
      })

      console.log("createdConcern: ", createdConcern)
      // @ts-expect-error i'll work on theis late
      setConcerns([...concerns, createdConcern])

      toast({
        variant: "default",
        title: "Success!",
        description: "Concern successfully created"
      })
      setOpenSheet(false)
    } catch (e) {
      console.log("error creating concern. e: ", e)
      toast({
        variant: "destructive",
        title: "Failure",
        description: "Error creating concern"
      })
    } finally {
      setLoading(false)
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      hint: "",
      say: "",
    },
  })

  const nameWatched = form.watch("name")
  const sayWatched = form.watch("say")

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleCreateConcern(values)
  }

  // <SheetTrigger className="flex items-center text-slate-500 hover:text-black">
  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetTrigger>
        <Button className="">
          <Plus />
          Add Concern
        </Button>
      </SheetTrigger>

      <SheetContent side="bottom">
        <SheetTitle className="text-center">
          {nameWatched}
        </SheetTitle>

        <div className="mt-2 pl-2 pr-2 pb-2 lg:w-[50%] lg:mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
              <ScrollArea className="max-h-[70vh]">

                <div className="bg-slate-50 p-4  mb-4 rounded-md">
                  <p className="font-bold mb-4">Preview of what will be said to the resident: </p>
                  <p>{greeting}</p>
                  <p className="pt-2 pb-2">{sayWatched}</p>
                  <p>{goodBye}</p>
                </div>

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
                        <STextArea
                          name="say"
                          placeHolder="Type what you would like to say to the resident..."
                          helperText="What to say to the resdident when called"
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
                  {loading ? <Spinner /> : "Create concern"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet >
  )
}

export default ConcernCardCreate