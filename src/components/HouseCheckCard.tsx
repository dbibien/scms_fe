
import { houseType } from "@/common/types"
import HomeAddress from "./HomeAddress"
import { Card, CardContent, CardTitle } from "./ui/card"
import Note from "./Note"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import STextArea from "./STextArea"
import { Button } from "./ui/button"
import Spinner from "./Spinner"
import { useState } from "react"
import { NotebookPen } from "lucide-react"

const FormSchema = z.object({
  everything_ok: z.enum(["yes", "no"], { required_error: "Required" }),
  remark: z.string().optional()
})

const HouseCheckCard = ({ house }: { house: houseType }) => {
  const [loading, setLoading] = useState(false)
  const [showRemarkField, setShowRemarkField] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const watchedOk = form.watch("everything_ok")

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log("data: ", data)
  }

  // console.log("watchedOk: ", watchedOk)

  return (
    <Card className="p-2 mb-8">
      <CardTitle className="text-lg text-slate-600">
        <HomeAddress house={house} />
      </CardTitle>

      <CardContent>
        {house?.note && (<>
          <div className="mt-4">
            <p className="text-sm underline text-slate-500">Note:</p>
            <Note note={house?.note} />
          </div>
        </>)
        }

        <div className="mt-4">
          <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="everything_ok"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md font-semibold mb-2">Is everything ok?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        // defaultValue="option-one"
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Yes
                          </FormLabel>
                        </FormItem>

                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            No
                          </FormLabel>
                        </FormItem>


                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="mb-4">
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowRemarkField(!showRemarkField)}
                  >
                    <NotebookPen className="text-slate-400 font-thin hover:text-black" />
                  </button>
                </div>

                {showRemarkField && (
                  <FormField
                    control={form.control}
                    name="remark"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-md font-semibold">Remark:</FormLabel>
                        <FormControl>
                          <STextArea
                            name="remark"
                            placeHolder="Remark regarding the home inspection"
                            helperText=""
                            styles="h-40"
                            fields={field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <div className="">
                <Button
                  type="submit"
                  disabled={loading || watchedOk === undefined}
                  className="w-full"
                >
                  {loading ? <Spinner /> : "Submit"}
                </Button>
              </div>

            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  )
}

export default HouseCheckCard 
