import ReportFilter from "@/components/ReportFilter"
import { Button } from "@/components/ui/button"

const ReportPage = () => {

  return (
    <div>
      <div className="flex justify-between">
        <ReportFilter />
        <Button>Create report</Button>
      </div>

    </div>
  )
}

export default ReportPage
