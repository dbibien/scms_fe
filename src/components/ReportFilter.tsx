import { useState } from "react"
import DatePicker from "./DatePicker"
import ReportTypePicker from "./ReportTypePicker"
import { Filter } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"

const ReportFilter = () => {
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined)
  const [toDate, setToDate] = useState<Date | undefined>(undefined)
  const [reportType, setReportType] = useState("")

  console.log("fromDate: ", fromDate)
  console.log("toDate: ", toDate)
  console.log("reportType: ", reportType)

  return (
    <Sheet>
      <SheetTrigger className="flex flex-row gap-1 items-center">
        <Filter />
        Filter
      </SheetTrigger>

      <SheetContent side="bottom">
        <div className="bg-red-50 mt-2 lg:flex lg:justify-center lg:items-end lg:gap-4">
          <DatePicker label="From" date={fromDate} setDate={setFromDate} />
          <DatePicker label="To" date={toDate} setDate={setToDate} />
          <ReportTypePicker label="Report type" setValue={setReportType} />
        </div>
      </SheetContent>
    </Sheet>

  )
}

export default ReportFilter
