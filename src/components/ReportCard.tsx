import { Card, CardContent, CardHeader } from "./ui/card"

const ReportCardText = ({ title, content }: { title: string, content: string }) => {
  return (
    <div className="flex gap-1">
      <p className="font-semibold text-gray-600">{title}: </p>
      <p>{content}</p>
    </div>
  )
}

const ReportCard = () => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <p className="text-right text-sm text-slate-400">Aug 12 2025 12:09hrs</p>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          <ReportCardText title="Officer" content="Bibien Dauphin" />
          <ReportCardText title="Address" content="11117 Boca Wood Boca Raton, fl 44i879" />
          <ReportCardText title="Type" content="Non-resident accident" />
          <ReportCardText title="Weather" content="Rainny" />
          <div className="lg:flex justify-between">
            <ReportCardText title="Resident" content="John Doeylucid" />
            <ReportCardText title="Phone" content="+19546703788" />
            <ReportCardText title="Member #" content="2343" />
          </div>
          <div className="flex justify-between">
            <ReportCardText title="Injury" content="Yes" />
            <ReportCardText title="EMS/PBSO" content="No" />
          </div>
        </div>

        <div className="mt-4">
          <ReportCardText title="Narative" content="" />
          <p>
            skjdseoinnsneianoilagj gj gjaig g joipwd g g joispai  gjoapgajg a
            jsdksoidigpwiespijg sgjopaijg ag  gjopagea opgjpajga g
          </p>
        </div>
      </CardContent>

    </Card>
  )
}

export default ReportCard
