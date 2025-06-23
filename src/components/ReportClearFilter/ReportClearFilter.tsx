import { reportFilterStartAndEndOfMonthDates } from "@/common/utils"
import { Trash } from "lucide-react"

type CProps = {
  setIsFiltered: React.Dispatch<React.SetStateAction<boolean>>
  getReports: (startDate: Date, endDate: Date, reportType: string, reportSortBy: string) => Promise<void>
}

const ReportClearFilter = ({ setIsFiltered, getReports }: CProps) => {
  const handleClearReportFilter = () => {
    const { startOfMonthDate, endOfMonthDate } = reportFilterStartAndEndOfMonthDates()
    getReports(startOfMonthDate, endOfMonthDate, "", "-created")
    setIsFiltered(false)
  }

  return (
    <button
      onClick={handleClearReportFilter}
      className="flex items-center gap-1 text-red-300 text-sm hover:text-red-500">
      <Trash size={20} />
      Clear filter
    </button>
  )
}

export default ReportClearFilter
