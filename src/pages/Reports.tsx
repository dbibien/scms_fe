import DatePicker from "@/components/DatePicker"
import ReportTypePicker from "@/components/ReportTypePicker"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const ReportPage = () => {
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined)
  const [toDate, setToDate] = useState<Date | undefined>(undefined)
  const [reportType, setReportType] = useState("")


  console.log("fromDate: ", fromDate)
  console.log("toDate: ", toDate)
  console.log("reportType: ", reportType)

  return (
    <div>
      <div className="flex justify-end">
        <Button>Create report</Button>
      </div>

      <div className="bg-red-50 mt-2 lg:flex lg:justify-center lg:gap-4">
        <DatePicker label="From" date={fromDate} setDate={setFromDate} />
        <DatePicker label="To" date={toDate} setDate={setToDate} />
        <ReportTypePicker setValue={setReportType} />
      </div>
    </div>
  )
}

export default ReportPage
