import { useState } from "react"
import DatePicker from "./DatePicker"
import ReportTypePicker from "./ReportTypePicker"
import { Filter } from "lucide-react"
import { Button } from "./ui/button"
import { toast } from "./ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { ReportFilterType } from "@/common/types"

type CProps = {
  isFiltered: boolean,
  // setReports: React.Dispatch<React.SetStateAction<[] | reportType[]>>,
  // setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setIsFiltered: React.Dispatch<React.SetStateAction<boolean>>,

  setReportType: React.Dispatch<React.SetStateAction<string>>,
  getReports: (startDate: Date, endDate: Date) => Promise<void>,
}

const ReportFilter = ({ isFiltered, setIsFiltered, setReportType, getReports }: CProps) => {
  const [openDialogue, setOpenDialogue] = useState(false)
  const [fromDate, setFromDate] = useState<Date>()
  const [toDate, setToDate] = useState<Date>()
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
      new Date(toDate?.getFullYear(), toDate?.getMonth(), toDate?.getDate(), 23, 59, 59)
    )
    setOpenDialogue(false)
    setIsFiltered(true)
  }

  // useEffect(() => {
  //   // query the backend for all reports for the month.
  //   // NOTE: due to timezone differences, I am querying the backend from the prev month at 12am to the next month at 11:59p
  //
  //   if (!isFiltered) { // this condition ensure the code queries for all of the report of the current month only on the first render and when the user have cleared a previous filter
  //     // const today = new Date()
  //     // const startDate = new Date(today.getFullYear(), today.getMonth())
  //     // const endOfMonthDate = new Date(today.getFullYear(), today.getMonth() + 1, -1)
  //
  //     const { today, startOfMonthDate, endOfMonthDate } = reportFilterStartAndEndOfMonthDates()
  //
  //     // console.log("startDate: ", startDate.toISOString())
  //     // console.log("endOfMonthDate : ", endOfMonthDate)
  //
  //     // setting the dates so the user can visually see they are filtering for reports from the 1st to the end of the month
  //     setFromDate(startOfMonthDate)
  //     setToDate(endOfMonthDate)
  //
  //     getReports( // passing in the modified dates to the function that will send the request to the backend
  //       new Date(startOfMonthDate.getFullYear(), startOfMonthDate.getMonth(), startOfMonthDate.getDate() - 1, 0, 0, 0, 0),
  //       new Date(today.getFullYear(), today.getMonth() + 1, -1, 23, 59, 59, 59)
  //     )
  //   }
  // }, [isFiltered])

  // console.log("fromDate: ", fromDate)
  // console.log("toDate: ", toDate)
  // console.log("reportType: ", reportType)
  // <PopoverTrigger className="flex flex-row gap-1 items-center">
  // </PopoverTrigger>

  // console.log("isFiltered:", isFiltered)

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


        <DatePicker label="From" date={fromDate} setDate={setFromDate} />
        <DatePicker label="To" date={toDate} setDate={setToDate} />
        <ReportTypePicker
          label="Report type"
          setValue={setReportType}
          styles="mt-2"
          reportFilterTypes={reportFilterTypes}
          setReportFilterTypes={setReportFilterTypes}
        />

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
