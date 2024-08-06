import { reportType } from "@/common/types"
import ReportCard from "./ReportCard"
import { ScrollArea } from "./ui/scroll-area"

type CProps = {
  reports: reportType[],
}

const ReportCardList = ({ reports }: CProps) => {
  return (
    <ScrollArea className="h-[80vh] mt-2">
      {reports?.map(report => (
        <ReportCard report={report} />
      ))}
    </ScrollArea>
  )
}

export default ReportCardList
