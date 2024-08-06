import { useEffect, useState } from "react"
import DatePicker from "./DatePicker"
import ReportTypePicker from "./ReportTypePicker"
import { Filter } from "lucide-react"
import { Popover } from "@radix-ui/react-popover"
import { PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { useApplicationStore } from "@/common/store"
import { reportType } from "@/common/types"

type CProps = {
  setReports: React.Dispatch<React.SetStateAction<[] | reportType[]>>,
}

const ReportFilter = ({ setReports }: CProps) => {
  const pb = useApplicationStore(state => state.pb)

  const [sheetOpen, setSheetOpen] = useState(false)
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined)
  const [toDate, setToDate] = useState<Date | undefined>(undefined)
  const [reportType, setReportType] = useState("")

  const getReports = async () => {
    // query the backend for all reports for the month
    const today = new Date()
    // const startDate = new Date(today.getFullYear(), today.getMonth())
    const endOfMonthDate = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    // console.log("startDate: ", startDate)
    // console.log("endOfMonthDate : ", endOfMonthDate )

    try {
      const houseFields = `id, narative, type, weather, incident_time, phone_number, injury, ems_pbso,
                          expand.house.id, expand.house.address, expand.house.apt, expand.house.city, expand.house.city,
                          expand.house.state, expand.house.zip, expand.house.member_number, expand.house.security_code,
                          expand.created_by.id, expand.created_by.first_name, expand.created_by.last_name,
                          expand.resident.id, expand.resident.first_name, expand.resident.last_name`
      const resultList = await pb.collection("reports").getFullList({
        // filter: `created <= '${startDate}' && created >= '${endDate}'`,
        filter: `created <= '${endOfMonthDate}'`,
        fields: houseFields,
        expand: "house, created_by, resident",
      })

      // console.log("resultList: ", resultList)

      const x: reportType[] = resultList?.map((result) => {
        return {
          id: result?.id,
          member_number: result?.expand?.house?.member_number,
          security_code: result?.expand?.house?.securty_code,
          incident_time: result?.incident_time,
          ems_pbso: result?.ems_pbso,
          injury: result?.injury,
          type: result?.type,
          phone_number: result?.phone_number,
          weather: result?.weather,
          narative: result?.narative?.replace("<p>", "").replace("</p>", ""),
          // address: `${result?.expand?.house?.address} ${result?.expand?.house?.apt} ${result?.expand?.house?.city} ${result?.expand?.house?.state} ${result?.expand?.house?.zip}`,
          house: {
            id: result?.expand?.house?.id,
            address: result?.expand?.house?.address,
            apt: result?.expand?.house?.apt,
            city: result?.expand?.house?.city,
            state: result?.expand?.house?.state,
            zip: result?.expand?.house?.zip,
          },
          resident: {
            id: result?.expand?.resident?.id,
            first_name: result?.expand?.resident?.first_name,
            last_name: result?.expand?.resident?.last_name,
          },
          created_by: {
            id: result?.expand?.created_by?.id,
            first_name: result?.expand?.created_by?.first_name,
            last_name: result?.expand?.created_by?.last_name,
          },
          // created_by: `${result?.expand?.created_by?.first_name} ${result?.expand?.created_by?.last_name}`,
        }
      })
      setReports(x)
    } catch (e) {
      console.log("e: ", e)
    }
  }

  const handleFilterReports = () => {
    console.log("Filtering reports")
    setSheetOpen(false)
  }

  useEffect(() => {
    getReports()
  }, [])

  // console.log("fromDate: ", fromDate)
  // console.log("toDate: ", toDate)
  // console.log("reportType: ", reportType)

  return (
    <Popover open={sheetOpen} onOpenChange={setSheetOpen}>
      <PopoverTrigger className="flex flex-row gap-1 items-center">
        <Filter />
        Filter
      </PopoverTrigger>

      <PopoverContent>
        <DatePicker label="From" date={fromDate} setDate={setFromDate} />
        <DatePicker label="To" date={toDate} setDate={setToDate} />
        <ReportTypePicker label="Report type" setValue={setReportType} styles="mt-2" />
        <Button
          className="mt-4 w-full flex gap-2"
          onClick={handleFilterReports}
        >
          <Filter />
          Filter
        </Button>
      </PopoverContent>
    </Popover>

  )
}

export default ReportFilter
