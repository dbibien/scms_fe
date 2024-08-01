import { useState } from "react"
import DatePicker from "./DatePicker"
import ReportTypePicker from "./ReportTypePicker"
import { Filter } from "lucide-react"
import { Popover } from "@radix-ui/react-popover"
import { PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"

const ReportFilter = () => {
  const [sheetOpen, setSheetOpen] = useState(false)
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined)
  const [toDate, setToDate] = useState<Date | undefined>(undefined)
  const [reportType, setReportType] = useState("")

  const handleFilterReports = () => {
    console.log("Filtering reports")
    setSheetOpen(false)
  }

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
