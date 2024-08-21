import { useEffect, useState } from "react"
import DatePicker from "./DatePicker"
import ReportTypePicker from "./ReportTypePicker"
import { Filter } from "lucide-react"
import { Popover } from "@radix-ui/react-popover"
import { PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { useApplicationStore } from "@/common/store"
import { reportType } from "@/common/types"
import { toast } from "./ui/use-toast"

type CProps = {
  isFiltered: boolean,
  setReports: React.Dispatch<React.SetStateAction<[] | reportType[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setIsFiltered: React.Dispatch<React.SetStateAction<boolean>>,
}

const ReportFilter = ({ isFiltered, setReports, setLoading, setIsFiltered }: CProps) => {
  const pb = useApplicationStore(state => state.pb)

  const [sheetOpen, setSheetOpen] = useState(false)
  const [fromDate, setFromDate] = useState<Date>()
  const [toDate, setToDate] = useState<Date>()
  const [reportType, setReportType] = useState("")

  const getReports = async (startDate: Date, endDate: Date) => {
    setLoading(true)
    try {
      const houseFields = `id, narative, type, weather, incident_time, phone_number, injury, ems_pbso,
                          expand.house.id, expand.house.address, expand.house.apt, expand.house.city, expand.house.city,
                          expand.house.state, expand.house.zip, expand.house.member_number, expand.house.security_code,
                          expand.created_by.id, expand.created_by.first_name, expand.created_by.last_name,
                          expand.resident.id, expand.resident.first_name, expand.resident.last_name`
      const resultList = await pb.collection("reports").getFullList({
        filter: `(incident_time  >= "${startDate.toISOString()}" && incident_time <= "${endDate.toISOString()}") ${reportType != "" ? `type = "${reportType}"` : ""}`, // it makes sense to filter by when the incident occured. Users will ask; "when did the incident occured?" not "When was the incident created on the software"
        // filter: `(created  >= "${startDate.toISOString()}" && created <= "${endDate.toISOString()}") ${reportType != "" ? `&& type = "${reportType}"` : ""}`,
        // filter: `(created >= "${startDate.toISOString()}" && created <= "${endDate.toISOString()}") ${reportType != "" ? `type = "${reportType}"` : ""}`,
        fields: houseFields,
        expand: "house, created_by, resident",
      })

      // console.log("resultList: ", resultList)

      const x: reportType[] = resultList?.map((result) => {
        return {
          id: result?.id,
          member_number: result?.expand?.house?.member_number,
          security_code: result?.expand?.house?.securty_code,
          incident_time: result?.incident_time,
          ems_pbso: result?.ems_pbso,
          injury: result?.injury,
          type: result?.type,
          phone_number: result?.phone_number,
          weather: result?.weather,
          narative: result?.narative?.replace("<p>", "").replace("</p>", ""),
          // address: `${result?.expand?.house?.address} ${result?.expand?.house?.apt} ${result?.expand?.house?.city} ${result?.expand?.house?.state} ${result?.expand?.house?.zip}`,
          house: {
            id: result?.expand?.house?.id,
            address: result?.expand?.house?.address,
            apt: result?.expand?.house?.apt,
            city: result?.expand?.house?.city,
            state: result?.expand?.house?.state,
            zip: result?.expand?.house?.zip,
          },
          resident: {
            id: result?.expand?.resident?.id,
            first_name: result?.expand?.resident?.first_name,
            last_name: result?.expand?.resident?.last_name,
          },
          created_by: {
            id: result?.expand?.created_by?.id,
            first_name: result?.expand?.created_by?.first_name,
            last_name: result?.expand?.created_by?.last_name,
          },
          // created_by: `${result?.expand?.created_by?.first_name} ${result?.expand?.created_by?.last_name}`,
        }
      })
      setReports(x)
    } catch (e) {
      // console.log("e: ", e)

      // @ts-expect-error fix types later
      const errData = e?.data
      let errMessage = "An error occured while retrieving reports"
      if (errData?.code === 404) {
        errMessage = errData?.message
        toast({
          variant: "destructive",
          title: "Failure",
          description: errMessage,
        })
      } else if (errData?.code === 400) {
        toast({
          variant: "destructive",
          title: "Failure",
          description: errData?.message,
        })
      } else {
        toast({
          variant: "destructive",
          title: "Failure",
          description: errMessage,
        })
      }
    } finally {
      setReportType("")
      setLoading(false)
    }
  }

  const handleFilterReports = () => {
    if (!fromDate || !toDate) {
      toast({
        variant: "destructive",
        title: "Filter error",
        description: "Dates must be selected",
      })
    }

    getReports(
      // // @ts-expect-error expected and handled
      // new Date(fromDate?.getFullYear(), fromDate?.getMonth(), fromDate?.getDate() - 1, 0, 0, 0, 0),
      // // @ts-expect-error expected and handled
      // new Date(toDate?.getFullYear(), toDate?.getMonth(), toDate?.getDate() - 1, 23, 59, 59, 59)


      // @ts-expect-error expected and handled
      new Date(fromDate?.getFullYear(), fromDate?.getMonth(), fromDate?.getDate(), 0, 0),
      // @ts-expect-error expected and handled
      new Date(toDate?.getFullYear(), toDate?.getMonth(), toDate?.getDate(), 23, 59, 59)
    )
    setSheetOpen(false)
    setIsFiltered(true)
  }

  useEffect(() => {
    // query the backend for all reports for the month.
    // NOTE: due to timezone differences, I am querying the backend from the prev month at 12am to the next month at 11:59p

    if (!isFiltered) { // this condition ensure the code queries for all of the report of the current month only on the first render and when the user have cleared a previous filter
      const today = new Date()
      const startDate = new Date(today.getFullYear(), today.getMonth())
      const endOfMonthDate = new Date(today.getFullYear(), today.getMonth() + 1, -1)
      // console.log("startDate: ", startDate.toISOString())
      // console.log("endOfMonthDate : ", endOfMonthDate)

      // setting the dates so the user can visually see they are filtering for reports from the 1st to the end of the month
      setFromDate(startDate)
      setToDate(endOfMonthDate)

      getReports( // passing in the modified dates to the function that will send the request to the backend
        new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() - 1, 0, 0, 0, 0),
        new Date(today.getFullYear(), today.getMonth() + 1, -1, 23, 59, 59, 59)
      )
    }
  }, [isFiltered])

  // console.log("fromDate: ", fromDate)
  // console.log("toDate: ", toDate)
  // console.log("reportType: ", reportType)

  return (
    <Popover open={sheetOpen} onOpenChange={setSheetOpen}>
      <PopoverTrigger className="flex flex-row gap-1 items-center">
        <Filter />
        Filter
      </PopoverTrigger>

      <PopoverContent>
        <DatePicker label="From" date={fromDate} setDate={setFromDate} />
        <DatePicker label="To" date={toDate} setDate={setToDate} />
        <ReportTypePicker label="Report type" setValue={setReportType} styles="mt-2" />
        <Button
          className="mt-6 w-full flex gap-2"
          onClick={handleFilterReports}
        >
          <Filter />
          Filter
        </Button>
      </PopoverContent>
    </Popover>
  )
}

export default ReportFilter
