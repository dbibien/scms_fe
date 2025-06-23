import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import HomeAddress from "../HomeAddress/HomeAddress"
import Note from "../Note"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { NotebookPen } from "lucide-react"
import { useState } from "react"
import { useApplicationStore, useLoggedInUserStore } from "@/common/store"
import STextArea from "../STextArea"
import Spinner from "../Spinner"
import { residentType } from "@/common/types"
import useGetHomes from "@/hooks/useGetHomes"
import { ScrollArea } from "../ui/scroll-area"

type CProps = {
  id: string,
  address: string,
  apt: string,
  city: string,
  state: string,
  zip: string,
  note: string,
  house_check_note: string,
  residents: residentType[],
}

const FormSchema = z.object({
  everything_ok: z.enum(["yes", "no"], { required_error: "Required" }),
  remark: z.string().optional()
})

const HouseCheckDialogue = ({ id, address, apt, city, state, zip, note, house_check_note, residents }: CProps) => {
  const pb = useApplicationStore(state => state.pb)
  const loggedInUserId = useLoggedInUserStore(state => state.user.id)
  const loggedInUserCommunityId = useLoggedInUserStore(state => state.user.community_id)

  const { getHomeData } = useGetHomes(loggedInUserCommunityId, false)

  const [loading, setLoading] = useState(false)
  const [showRemarkField, setShowRemarkField] = useState(false)
  const [openDialogue, setOpenDialogue] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const watchedOk = form.watch("everything_ok")

  const createReport = async (values: { everything_ok: "yes" | "no", remark?: string | undefined }) => {
    // console.log("values: ", values)
    const yesMessage = "House was inspected on the date and time mentioned above and everything is ok."
    const noMessage = "House was inpected and issues were found"

    try {
      // const record = await pb.collection('reports').create({
      await pb.collection('reports').create({
        narative: values?.remark && values?.remark !== "" ? values?.remark : values.everything_ok === "yes" ? yesMessage : noMessage,
        ai_generated_narative: "",
        type: "house_check",
        incident_time: new Date(),
        weather: "clear",
        // "phone_number": values?.phoo,
        created_by: loggedInUserId,
        community: loggedInUserCommunityId,
        house: id,
        resident: residents?.length > 0 ? residents[0]?.id : "",
        injury: false,
        ems_pbso: false,
      })
    } catch (e) {
      console.log(e)
    }
  }

  const updateHome = async () => {
    try {
      await pb.collection("houses").update(id, {
        house_check_last_date: new Date(),
      })

      // filtering the just updated home out of the list of houses to be checked
      // setHousesToBeChecked(housesToBeChecked.filter(ahouse => (ahouse?.id !== house?.id)))
    } catch (e) {
      console.log(e)
    }
  }

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    // console.log("data: ", data)

    setLoading(true)

    try {
      await createReport(data)
      await updateHome()
      await getHomeData()
      setOpenDialogue(false)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }


  // console.log(form.formState.errors)

  return (
    <Dialog open={openDialogue} onOpenChange={setOpenDialogue}>
      <DialogTrigger asChild>
        <Button
          data-testid="home-notice-houseCheck"
          className="text-sm text-purple-500 p-2 rounded-md bg-purple-200 hover:bg-purple-300"
        >
          House check
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col items-center" >
          <DialogTitle data-testid="house-check-dialogue">House Check</DialogTitle>
          <DialogDescription>
            <HomeAddress
              address={address}
              apt={apt}
              city={city}
              state={state}
              zip={zip}
              styles="text-center font-bold text-lg text-black"
            />
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[50vh]">
          {note && (<>
            <div className="mt-2">
              <p className="text-sm underline text-slate-500">House note:</p>
              <Note note={note} />
            </div>
          </>)
          }

          {house_check_note && (<>
            <div className="mt-4">
              <p className="text-sm underline text-slate-500">House check note:</p>
              <Note note={house_check_note} />
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

                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={loading || watchedOk === undefined}
                    className="w-full"
                  >
                    {loading ? <Spinner /> : "Submit"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default HouseCheckDialogue 
