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
import { concernType } from "@/common/types"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Pen } from "lucide-react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ScrollArea } from "./ui/scroll-area"
import { useApplicationStore, useCommunityStore, useLoggedInUserStore } from "@/common/store"
import { useToast } from "./ui/use-toast"
import { useState } from "react"
import Spinner from "./Spinner"

type concernCardType = {
  concern: concernType,
}

const formSchema = z.object({
  name: z.string().min(1, "Name must be longer than a character").max(100, "Name must not exceed 100 characters "),
  hint: z.string().min(1, { message: "Hint must be 1 character long" }).max(200, { message: "Hint must not exceed 200 characters" }),
  say: z.string().min(1, { message: "Say must be 1 character long" }).max(256, { message: "Say must not exceed 256 characters" }),
  // password: z.string().min(8, { message: "Password must be between 8 and 24 characters" }).max(24, { message: "Password must be between 8 and 24 characters" }),
})

const ConcernCardEdit = ({ concern }: concernCardType) => {
  const pb = useApplicationStore(state => state.pb)
  const loggedInUserId = useLoggedInUserStore(state => state.user.id)
  const setUpdatedConcern = useCommunityStore(state => state.setUpdateConcern)

  const [openSheet, setOpenSheet] = useState(false)
  const [loading, setLoading] = useState(false)

  const greeting = "Hello. This is Boca Woods Security."
  const goodBye = "Thank you. Good bye."

  const { toast } = useToast()

  const handleUpdateConcern = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    try {
      const data = {
        name: values.name,
        hint: values.hint,
        say: values.say,
        added_by: loggedInUserId,
      }
      const updatedConcern = await pb.collection('concerns').update(concern?.id, data, {
        fields: "id, name, hint, say"
      })
      // @ts-expect-error i'll fix the ts errors at a later time
      setUpdatedConcern(updatedConcern)
      toast({
        variant: "default",
        title: "Success!",
        description: "Concern successfully updated"
      })
      setOpenSheet(false)
    } catch (e) {
      console.log("error updating concern. e: ", e)
      toast({
        variant: "destructive",
        title: "Failure",
        description: "Error updating concern"
      })
    } finally {
      setLoading(false)
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: concern?.name,
      hint: concern?.hint,
      say: concern?.say?.replace("<p>", "").replace("</p>", ""),
    },
  })

  const sayWatched = form.watch("say")

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleUpdateConcern(values)
  }

  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetTrigger className="flex gap-2 items-center text-slate-500 hover:text-black">
        <Pen />
        <p>Edit</p>
      </SheetTrigger>

      <SheetContent side="bottom">
        <SheetTitle className="text-center">
          {concern?.name}
        </SheetTitle>

        <div className="mt-2 pl-2 pr-2 pb-2 lg:w-[50%] lg:mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">

              <ScrollArea className="h-[70vh]">
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
                  {loading ? <Spinner /> : "Update concern"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet >
  )
}

export default ConcernCardEdit
