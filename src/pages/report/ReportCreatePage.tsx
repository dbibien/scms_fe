import { Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Spinner from "@/components/Spinner"
import { useState } from "react"
import SCMSFormInputSelector from "@/components/SCMSFormInputSelector"
import { REPORT_TYPES } from "@/common/utils"
import SCMSFormInputSwitch from "@/components/SCMSFormInputSwitch"
import SCMSFormInputTimePicker from "@/components/SCMSFormInputTimePicker"
import { createReportFormSchema } from "@/common/formSchemas"
import SCMSFormInputCalendar from "@/components/SCMSFormInputCalendar"
import SCMSHouseSearch from "@/components/SCMSHouseSearch"
import { houseType } from "@/common/types"
import { useApplicationStore, useCommunityStore, useLoggedInUserStore } from "@/common/store"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TabsContent } from "@radix-ui/react-tabs"
import NarativeTextArea from "@/components/NarativeTextArea"
import PageHeader from "@/components/PageHeader/PageHeader"
import { useNavigate } from "react-router-dom"

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

const TABS_HEADER = {
  original: "original",
  aiGenerated: "ai-generated",
}

const ReportCreatePage = () => {
  const pb = useApplicationStore(state => state.pb)
  const communityID = useCommunityStore(state => state.community.id)
  const loggedInUserId = useLoggedInUserStore(state => state.user.id)

  const [loading, setLoading] = useState(false)
  const [selectedHouse, setSelectedHouse] = useState<houseType>()
  // const [aiGeneratedNarative, setAiGeneratedNarative] = useState("")

  const form = useForm<z.infer<typeof createReportFormSchema>>({
    resolver: zodResolver(createReportFormSchema),
    defaultValues: {
      incidentTimeDate: new Date(),
    },
  })

  const navigate = useNavigate()

  const reportNarative = form.watch("narative")
  const aiGeneratedNarative = form.watch("aiGeneartedNarative")

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
        ai_generated_narative: values?.aiGeneartedNarative,
        type: values?.type,
        incident_time: incidentDateTime, // TODO: use the hour and the minutes to create the actual and correct time
        weather: values?.weather,
        // "phone_number": values?.phoo,
        created_by: loggedInUserId,
        community: communityID,
        house: selectedHouse?.id,
        // @ts-expect-error this is ok
        resident: selectedHouse?.residents?.length > 0 ? selectedHouse?.residents[0]?.id : "",
        injury: values?.injury,
        ems_pbso: values?.ems_pbso,
      })

      // console.log("record: ", record)

      setSelectedHouse(undefined)

      // const { today, startOfMonthDate } = reportFilterStartAndEndOfMonthDates()
      // await getReports( // passing in the modified dates to the function that will send the request to the backend
      //   new Date(startOfMonthDate.getFullYear(), startOfMonthDate.getMonth(), startOfMonthDate.getDate() - 1, 0, 0, 0, 0),
      //   new Date(today.getFullYear(), today.getMonth() + 1, -1, 23, 59, 59, 59)
      // )

      form.reset({
        type: "",
        weather: "",
        incidentTimeDate: new Date(),
        incidentTimeHour: "",
        incidentTimeMinute: "",
        narative: "",
        injury: false,
        ems_pbso: false,
        house: undefined,
        resident: undefined,
        createdBy: undefined,
      })

      toast({
        variant: "default",
        title: "Success",
        description: "Report created successfully",
      })

      navigate("/reports")
    } catch (e) {
      // console.log("e: ", e)
      // @ts-expect-error fix types later
      const errData = e?.data
      if (errData?.code) {
        toast({
          variant: "destructive",
          title: "Fail",
          description: errData?.message,
        })
      } else {
        toast({
          variant: "destructive",
          title: "Fail",
          description: "An error occured while performing action",
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const handleAIAssist = async () => {
    setLoading(true)

    try {
      const res = await pb.send(`/api/scms/ai-assist`, {
        method: "post",
        headers: {
          "Content-type": "application/json",
          "Authorization": `${pb.authStore.token} `,
        },
        body: JSON.stringify({
          user_input: reportNarative,
        })
      })
      // console.log("res: ", res)
      // setAiGeneratedNarative(res?.data)
      form.setValue("aiGeneartedNarative", res?.data)
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Fail",
        // @ts-expect-error ok for now
        description: e.data?.message,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSetCurrentTimeAsReportTime = () => {
    const now = new Date()
    form.setValue("incidentTimeHour", now.getHours().toString())
    form.setValue("incidentTimeMinute", now.getMinutes().toString())
  }

  // console.log("form: ", form)
  // <ScrollArea className="h-[50vh] space-y-8">
  // <div className="mt-2 pl-2 pr-2 pb-2 lg:w-[50%] lg:mx-auto">

  return (
    <>
      <PageHeader title="Create report" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>

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

          <div className="mt-2">
            <p className="text-sm  font-medium">Incident date: </p>

            <SCMSFormInputCalendar control={form.control} />

            <p className="text-sm font-medium mt-4">Incident time: </p>

            <SCMSFormInputTimePicker
              control={form.control}
              handleSetCurrentTimeAsReportTime={handleSetCurrentTimeAsReportTime}
            />
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

          <div className="flex flex-row justify-between items-center mt-2">
            <FormLabel>Narative: </FormLabel>
            <Button
              type="button"
              size="sm"
              disabled={reportNarative?.length === 0 || reportNarative === undefined}
              onClick={handleAIAssist}
            >
              {loading ? <Spinner /> : (
                <>
                  <Brain className="pr-1" />
                  Ai Assist
                </>
              )}
            </Button>
          </div>

          <Tabs defaultValue={aiGeneratedNarative && aiGeneratedNarative?.length > 0 ? TABS_HEADER.aiGenerated : TABS_HEADER.original}>
            <TabsList>
              <TabsTrigger value={TABS_HEADER.original}>Original</TabsTrigger>
              {aiGeneratedNarative && (
                <TabsTrigger value={TABS_HEADER.aiGenerated}>Ai Generated</TabsTrigger>
              )}
            </TabsList>

            <TabsContent value={TABS_HEADER.original}>
              <FormField
                control={form.control}
                name="narative"
                render={({ field }) => (
                  <FormItem className="mb-4 mt-2">
                    <FormControl>
                      <NarativeTextArea
                        name="say"
                        placeHolder="Date, time, who, what, where"
                        value={reportNarative}
                        helperText="Narative of what occured"
                        max={4500}
                        styles="h-40"
                        fields={field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>

            <TabsContent value={TABS_HEADER.aiGenerated}>
              <FormField
                control={form.control}
                name="aiGeneartedNarative"
                render={({ field }) => (
                  <FormItem className="mb-4 mt-2">
                    <FormControl>
                      <NarativeTextArea
                        name="say"
                        placeHolder="Date, time, who, what, where"
                        value={aiGeneratedNarative || ""}
                        helperText="Narative of what occured"
                        max={4500}
                        styles="h-40"
                        fields={field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
          </Tabs>

          <div className="my-8">
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
    </>
  )
}

export default ReportCreatePage 
