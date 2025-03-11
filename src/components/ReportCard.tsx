import { reportType } from "@/common/types"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import Note from "./Note"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useState } from "react"

type CProps = {
  report: reportType,
}

const NARATIVE_TYPE = {
  aiAssist: "Ai assist",
  original: "original",
}

const ReportCardText = ({ title, content }: { title: string, content: string }) => {
  return (
    <div className="flex gap-1">
      <p className="font-semibold text-gray-600">{title}: </p>
      <p>{content}</p>
    </div>
  )
}

// TODO: by the default, "Ai assist should be selected"
const ReportCardNarativeTypeSelector = ({ narativeType, setNarativeType }: { narativeType: string, setNarativeType: React.Dispatch<React.SetStateAction<string>> }) => {
  return (
    <Select defaultValue={narativeType} onValueChange={(e) => setNarativeType(e)}>
      <SelectTrigger className="w-40">
        <SelectValue placeholder="Select narative type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem defaultChecked value={NARATIVE_TYPE.aiAssist}>Ai assist</SelectItem>
        <SelectItem value={NARATIVE_TYPE.original}>Orginal</SelectItem>
      </SelectContent>
    </Select>
  )
}

const ReportCard = ({ report }: CProps) => {
  const [narativeType, setNarativeType] = useState(NARATIVE_TYPE.aiAssist)

  const addressString = `${report?.house?.address} ${report?.house?.apt}, ${report?.house?.city} ${report?.house?.state}, ${report?.house?.zip}`

  return (
    <Card className="mb-4">
      <CardHeader>
        <p className="text-sm text-slate-400">Incident time: {`${new Date(report.incident_time).toLocaleString()}`}</p>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          <ReportCardText title="Officer" content={`${report?.created_by?.first_name} ${report?.created_by?.last_name}`} />
          <ReportCardText title="Address" content={addressString.includes("undefined") || addressString == "" ? "N/A" : addressString} />
          <ReportCardText title="Type" content={report?.type} />
          <ReportCardText title="Weather" content={report?.weather} />
          <div className="lg:flex justify-between">
            <ReportCardText title="Resident" content={`${report?.resident?.first_name || ""} ${report?.resident?.last_name || "N/A"}`} />
            <ReportCardText title="Phone" content={report?.phone_number} />
            <ReportCardText title="Member #" content={report?.member_number} />
          </div>
          <div className="flex justify-between">
            <ReportCardText title="Injury" content={`${report?.injury ? "Yes" : "No"}`} />
            <ReportCardText title="EMS/PBSO" content={`${report?.ems_pbso ? "Yes" : "No"}`} />
          </div>
        </div>

        <div className="mt-4">
          <div className="flex flex-row justify-between items-center">
            <ReportCardText title="Narative" content="" />
            <ReportCardNarativeTypeSelector
              narativeType={narativeType}
              setNarativeType={setNarativeType}
            />
          </div>
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
