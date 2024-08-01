import { useState } from "react"
import DatePicker from "./DatePicker"
import ReportTypePicker from "./ReportTypePicker"

const ReportFilter = () => {
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined)
  const [toDate, setToDate] = useState<Date | undefined>(undefined)
  const [reportType, setReportType] = useState("")

  console.log("fromDate: ", fromDate)
  console.log("toDate: ", toDate)
  console.log("reportType: ", reportType)

  return (
    <div className="bg-red-50 mt-2 lg:flex lg:justify-center lg:items-end lg:gap-4">
      <DatePicker label="From" date={fromDate} setDate={setFromDate} />
      <DatePicker label="To" date={toDate} setDate={setToDate} />
      <ReportTypePicker label="Report type" setValue={setReportType} />
    </div>

  )
}

export default ReportFilter
