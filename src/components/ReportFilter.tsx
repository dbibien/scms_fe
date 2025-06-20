import { useState } from "react"
import DatePicker from "./DatePicker"
import ReportTypePicker from "./ReportTypePicker"
import { Filter } from "lucide-react"
import { Popover } from "@radix-ui/react-popover"
import { PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
// import { reportType } from "@/common/types"
import { toast } from "./ui/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"

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
        <ReportTypePicker label="Report type" setValue={setReportType} styles="mt-2" />

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
