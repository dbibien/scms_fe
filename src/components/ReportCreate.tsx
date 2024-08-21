import { Plus } from "lucide-react"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { ScrollArea } from "./ui/scroll-area"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
// import SInput from "./SInput"
import STextArea from "./STextArea"
import Spinner from "./Spinner"
import { useState } from "react"
import SCMSFormInputSelector from "./SCMSFormInputSelector"
import { REPORT_TYPES, reportFilterStartAndEndOfMonthDates } from "@/common/utils"
import SCMSFormInputSwitch from "./SCMSFormInputSwitch"
import SCMSFormInputTimePicker from "./SCMSFormInputTimePicker"
import { createReportFormSchema } from "@/common/formSchemas"
import SCMSFormInputCalendar from "./SCMSFormInputCalendar"
import SCMSHouseSearch from "./SCMSHouseSearch"
import { houseType } from "@/common/types"
import { useApplicationStore, useLoggedInUserStore } from "@/common/store"
import { toast } from "./ui/use-toast"

type CProps = {
  openSheet: boolean,
  setOpenSheet: React.Dispatch<React.SetStateAction<boolean>>
  getReports: (startDate: Date, endDate: Date) => Promise<void>,
}

const WEATHER_TYPES = [
  {
    id: 1,
    value: "clear",
    label: "Clear",
  },
  {
    id: 2,
    value: "sunny",
    label: "Sunny",
  },
  {
    id: 3,
    value: "cloudy",
    label: "Cloudy",
  },
  {
    id: 4,
    value: "rainy",
    label: "Rainy",
  },
]

const ReportCreate = ({ openSheet, setOpenSheet, getReports }: CProps) => {
  const pb = useApplicationStore(state => state.pb)
  const loggedInUserId = useLoggedInUserStore(state => state.user.id)

  const [loading, setLoading] = useState(false)
  const [selectedHouse, setSelectedHouse] = useState<houseType>()

  const form = useForm<z.infer<typeof createReportFormSchema>>({
    resolver: zodResolver(createReportFormSchema),
    // defaultValues: {
    //   type: "",
    //   hint: "",
    //   say: "",
    // },
  })

  async function onSubmit(values: z.infer<typeof createReportFormSchema>) {
    setLoading(true)
    // console.log("submiting...")
    // console.log("values: ", values)

    let incidentTimeHour = 0
    let incidentTimeMinute = 0
    try {
      incidentTimeHour = parseInt(values?.incidentTimeHour)
      incidentTimeMinute = parseInt(values?.incidentTimeMinute)
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Incorrect hour and/or minute"
      })
      setLoading(false)
      return
    }

    const incidentDateTime = new Date(values?.incidentTimeDate.getFullYear(), values?.incidentTimeDate.getMonth(), values?.incidentTimeDate.getDate(), incidentTimeHour, incidentTimeMinute)

    try {
      // const record = await pb.collection('reports').create({
      await pb.collection('reports').create({
        narative: values?.narative,
        type: values?.type,
        incident_time: incidentDateTime, // TODO: use the hour and the minutes to create the actual and correct time
        weather: values?.weather,
        // "phone_number": values?.phoo,
        created_by: loggedInUserId,
        house: selectedHouse?.id,
        // @ts-expect-error this is ok
        resident: selectedHouse?.residents?.length > 0 ? selectedHouse?.residents[0]?.id : "",
        injury: values?.injury,
        ems_pbso: values?.ems_pbso,
      })

      // console.log("record: ", record)

      setSelectedHouse(undefined)

      const { startOfMonthDate, endOfMonthDate } = reportFilterStartAndEndOfMonthDates()
      await getReports(startOfMonthDate, endOfMonthDate)

      setOpenSheet(false)

      toast({
        variant: "default",
        title: "Success",
        description: "Report created successfully",
      })
    } catch (e) {
      // console.log("e: ", e)
      // @ts-expect-error fix at a later time
      const errData = e?.data
      toast({
        variant: "destructive",
        title: "Fail",
        description: errData?.message,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetTrigger asChild>
        <Button className="">
          <Plus />
          Create Report
        </Button>
      </SheetTrigger>

      <SheetContent side="bottom">
        <SheetTitle className="text-center">
          Create Report
        </SheetTitle>

        <div className="mt-2 pl-2 pr-2 pb-2 lg:w-[50%] lg:mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>

              <ScrollArea className="h-[50vh] space-y-8">
                <SCMSFormInputSelector
                  control={form.control}
                  name="type"
                  label="Type"
                  placeHolder="Select report type"
                  data={REPORT_TYPES}
                />

                <SCMSFormInputSelector
                  control={form.control}
                  name="weather"
                  label="Weather"
                  placeHolder="Select weather"
                  data={WEATHER_TYPES}
                />

                <div>
                  <p className="text-sm  font-medium">Incident date: </p>

                  <SCMSFormInputCalendar control={form.control} />

                  <p className="text-sm font-medium">Incident time: </p>

                  <SCMSFormInputTimePicker control={form.control} />
                </div>

                <SCMSHouseSearch setHouse={setSelectedHouse} />

                <SCMSFormInputSwitch
                  control={form.control}
                  name="injury"
                  label="Injury"
                />

                <SCMSFormInputSwitch
                  control={form.control}
                  name="ems_pbso"
                  label="EMS/PBSO"
                />

                <FormField
                  control={form.control}
                  name="narative"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Narative: </FormLabel>
                      <FormControl>
                        <STextArea
                          name="say"
                          placeHolder="Date, time, who, what, where"
                          helperText="Narative of what occured"
                          max={350}
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
                  {loading ? <Spinner /> : "Create report"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default ReportCreate
