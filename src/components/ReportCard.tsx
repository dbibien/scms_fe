import { reportType } from "@/common/types"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import Note from "./Note"

type CProps = {
  report: reportType,
}

const ReportCardText = ({ title, content }: { title: string, content: string }) => {
  return (
    <div className="flex gap-1">
      <p className="font-semibold text-gray-600">{title}: </p>
      <p>{content}</p>
    </div>
  )
}

const ReportCard = ({ report }: CProps) => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <p className="text-sm text-slate-400">Incident time: {`${new Date(report.incident_time).toLocaleString()}`}</p>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          <ReportCardText title="Officer" content={`${report?.created_by?.first_name} ${report?.created_by?.last_name}`} />
          <ReportCardText title="Address" content={`${report?.house?.address} ${report?.house?.apt}, ${report?.house?.city} ${report?.house?.state}, ${report?.house?.zip}`} />
          <ReportCardText title="Type" content={report?.type} />
          <ReportCardText title="Weather" content={report?.weather} />
          <div className="lg:flex justify-between">
            <ReportCardText title="Resident" content={`${report?.resident?.first_name} ${report?.resident?.last_name}`} />
            <ReportCardText title="Phone" content={report?.phone_number} />
            <ReportCardText title="Member #" content={report?.member_number} />
          </div>
          <div className="flex justify-between">
            <ReportCardText title="Injury" content={`${report?.injury ? "Yes" : "No"}`} />
            <ReportCardText title="EMS/PBSO" content={`${report?.ems_pbso ? "Yes" : "No"}`} />
          </div>
        </div>

        <div className="mt-4">
          <ReportCardText title="Narative" content="" />
          <Note note={report?.narative} />
        </div>
      </CardContent>

      <CardFooter>
        <p className="text-sm text-slate-400">Created: {`${new Date(report.created).toLocaleString()}`}</p>
      </CardFooter>
    </Card>
  )
}

export default ReportCard
