import { useEffect, useState } from "react"
import DatePicker from "./DatePicker"
import ReportTypePicker from "./ReportTypePicker"
import { Filter } from "lucide-react"
import { Popover } from "@radix-ui/react-popover"
import { PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { useApplicationStore } from "@/common/store"

type CProps = {
  setReports: React.Dispatch<React.SetStateAction<undefined>>,
}

const ReportFilter = ({ setReports }: CProps) => {
  const pb = useApplicationStore(state => state.pb)

  const [sheetOpen, setSheetOpen] = useState(false)
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined)
  const [toDate, setToDate] = useState<Date | undefined>(undefined)
  const [reportType, setReportType] = useState("")

  const getReports = async () => {
    // query the backend for all reports for the month
    const today = new Date()
    const startDate = new Date(today.getFullYear(), today.getMonth())
    const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    console.log("startDate: ", startDate)
    console.log("endStart: ", endDate)

    try {
      const houseFields = `id, narative, type, weather, incident_time, phone_number, injury, ems_pbso,
                          expand.house.id, expand.house.address, expand.house.apt, expand.house.city, expand.house.city,
                          expand.house.state, expand.house.zip, expand.house.member_number, expand.house.security_code
                          expand.created_by.id, expand.created_by.first_name, expand.created_by.last_name`
      const resultList = await pb.collection("reports").getFullList({
        // filter: `created >= '${startDate}' && created <= '${endDate}'`
        filter: `created <= '${endDate}'`,
        fields: houseFields,
        expand: "house, created_by",
      })

      console.log("resultList: ", resultList)

    } catch (e) {
      console.log("e: ", e)
    }
  }

  const handleFilterReports = () => {
    console.log("Filtering reports")
    setSheetOpen(false)
  }

  useEffect(() => {
    getReports()
  }, [])

  console.log("fromDate: ", fromDate)
  console.log("toDate: ", toDate)
  console.log("reportType: ", reportType)

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
          className="mt-4 w-full"
          onClick={handleFilterReports}
        >
          Filter
        </Button>
      </PopoverContent>
    </Popover>

  )
}

export default ReportFilter
