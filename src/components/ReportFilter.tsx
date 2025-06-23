import { useState } from "react"
import DatePicker from "./DatePicker"
import ReportTypePicker from "./ReportTypePicker"
import { Filter } from "lucide-react"
import { Button } from "./ui/button"
import { toast } from "./ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { ReportFilterType } from "@/common/types"
import { ScrollArea } from "./ui/scroll-area"
import ReportSort from "./ReportSort/ReportSort"
import { generateSelectedReportTypeString } from "@/common/utils"

type CProps = {
  isFiltered: boolean,
  setIsFiltered: React.Dispatch<React.SetStateAction<boolean>>,
  getReports: (startDate: Date, endDate: Date, reportType: string, reportSortBy: string) => Promise<void>,
}

const ReportFilter = ({ setIsFiltered, getReports }: CProps) => {
  const [openDialogue, setOpenDialogue] = useState(false)
  const [fromDate, setFromDate] = useState<Date>()
  const [toDate, setToDate] = useState<Date>()
  const [reportSortBy, setReportSortBy] = useState("-created")
  const [reportFilterTypes, setReportFilterTypes] = useState<ReportFilterType[]>([
    {
      id: 1,
      value: "accident",
      label: "Accident",
      isSelected: false,
    },
    {
      id: 2,
      value: "assist_ems",
      label: "Assist EMS",
      isSelected: false,
    },
    {
      id: 3,
      value: "damaged_mailbox",
      label: "Damaged mailbox",
      isSelected: false,
    },
    {
      id: 4,
      value: "ems_response",
      label: "EMS response",
      isSelected: false,
    },
    {
      id: 5,
      value: "false_alarm",
      label: "False alarm",
      isSelected: false,
    },
    {
      id: 12,
      value: "garage_door_light_check",
      label: "Garage door light check",
      isSelected: false,
    },
    {
      id: 14,
      value: "house_check",
      label: "House check",
      isSelected: false,
    },
    {
      id: 6,
      value: "loud_noise",
      label: "Loud noise",
      isSelected: false,
    },
    {
      id: 7,
      value: "open_garage_door",
      label: "Open garage door",
      isSelected: false,
    },
    {
      id: 13,
      value: "ticket_issued",
      label: "Ticket issued",
      isSelected: false,
    },
    {
      id: 8,
      value: "unauthorized_entry",
      label: "Unauthorized entry",
      isSelected: false,
    },
    {
      id: 9,
      value: "vehicle_damage",
      label: "Vehicle damage",
      isSelected: false,
    },
    {
      id: 10,
      value: "vehicle_tailgaite",
      label: "Vehicle tailgate",
      isSelected: false,
    },
    {
      id: 11,
      value: "youths_fishing",
      label: "Youths fishing",
      isSelected: false,
    }
  ])

  const handleFilterReports = () => {
    if (!fromDate || !toDate) {
      toast({
        variant: "destructive",
        title: "Filter error",
        description: "Dates must be selected",
      })
    }

    getReports(
      // @ts-expect-error expected and handled
      new Date(fromDate?.getFullYear(), fromDate?.getMonth(), fromDate?.getDate(), 0, 0),
      // @ts-expect-error expected and handled
      new Date(toDate?.getFullYear(), toDate?.getMonth(), toDate?.getDate(), 23, 59, 59),
      generateSelectedReportTypeString(reportFilterTypes), // generates the string for filtering the reports by type
      reportSortBy
    )
    setOpenDialogue(false)
    setIsFiltered(true)
  }

  const handleReportSortBy = (val: "newest" | "oldest") => {
    if (val === "newest") {
      setReportSortBy("-created")
    } else {
      setReportSortBy("created")
    }
  }

  return (
    <Dialog open={openDialogue} onOpenChange={setOpenDialogue}>
      <DialogTrigger asChild>
        <Button
          data-testid="report-filter"
          className="text-sm p-2 rounded-md bg-transparent text-black hover:bg-transparent"
        >
          <Filter />
          Filter + Sort
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col items-center" >
          <DialogTitle data-testid="house-check-dialogue">Filter + Sort</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[50vh]">
          <DatePicker label="From" date={fromDate} setDate={setFromDate} />
          <DatePicker label="To" date={toDate} setDate={setToDate} />
          <ReportTypePicker
            label="Report type"
            styles="mt-2"
            reportFilterTypes={reportFilterTypes}
            setReportFilterTypes={setReportFilterTypes}
          />
          <ReportSort
            label="Sort by"
            handleReportSortBy={handleReportSortBy}
          />
        </ScrollArea>

        <Button
          className="mt-6 w-full flex gap-2"
          onClick={handleFilterReports}
        >
          <Filter />
          Filter
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default ReportFilter
