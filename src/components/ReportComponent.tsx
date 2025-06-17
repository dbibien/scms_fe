import { useApplicationStore, useCommunityStore } from "@/common/store"
import { reportType } from "@/common/types"
import { reportFilterStartAndEndOfMonthDates } from "@/common/utils"
import PageInfoBar from "@/components/PageInfoBar"
import ReportCardList from "@/components/ReportCardList"
import ReportCreate from "@/components/ReportCreate"
import ReportFilter from "@/components/ReportFilter"
import SplInput from "@/components/SplInput"
import { toast } from "@/components/ui/use-toast"
import { Plus, Trash } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const ClearFilter = ({ setIsFiltered }: { setIsFiltered: React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    <button
      onClick={() => setIsFiltered(false)}
      className="flex items-center gap-1 text-red-300 text-sm hover:text-red-500">
      <Trash size={20} />
      Clear filter
    </button>
  )
}

const ReportComponent = () => {
  const pb = useApplicationStore(state => state.pb)
  const communityID = useCommunityStore(state => state.community.id)

  const [reports, setReports] = useState<reportType[] | []>([])
  const [searchReportValue, setSearchReportValue] = useState("")
  const [searchResultLength, setSearchResultLength] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [isFiltered, setIsFiltered] = useState(false)
  const [openReportCreate, setOpenReportCreate] = useState(false)
  const [reportType, setReportType] = useState("")

  const getReports = async (startDate: Date, endDate: Date) => {
    setLoading(true)
    try {
      const houseFields = `id, narative, ai_generated_narative, type, weather, incident_time, created, phone_number, injury, ems_pbso,
                          expand.house.id, expand.house.address, expand.house.apt, expand.house.city, expand.house.city,
                          expand.house.state, expand.house.zip, expand.house.member_number, expand.house.security_code,
                          expand.created_by.id, expand.created_by.first_name, expand.created_by.last_name,
                          expand.resident.id, expand.resident.first_name, expand.resident.last_name`

      const resultList = await pb.collection("reports").getFullList({
        filter: `(incident_time  >= "${startDate.toISOString()}" && incident_time <= "${endDate.toISOString()}") && community = "${communityID || 0}" ${reportType != "" ? ` && type = "${reportType}"` : ""}`, // it makes sense to filter by when the incident occured. Users will ask; "when did the incident occured?" not "When was the incident created on the software". Only get the reports for a particular community. 
        // filter: `(incident_time  >= "${startDate.toISOString()}" && incident_time <= "${endDate.toISOString()}") && community = "${communityID}" ${reportType != "" ? ` && type = "${reportType}"` : ""}`, // it makes sense to filter by when the incident occured. Users will ask; "when did the incident occured?" not "When was the incident created on the software"
        // filter: `(incident_time  >= "${startDate.toISOString()}" && incident_time <= "${endDate.toISOString()}") ${reportType != "" ? ` && type = "${reportType}"` : ""}`, // it makes sense to filter by when the incident occured. Users will ask; "when did the incident occured?" not "When was the incident created on the software"
        // filter: `(created  >= "${startDate.toISOString()}" && created <= "${endDate.toISOString()}") ${reportType != "" ? `&& type = "${reportType}"` : ""}`,
        // filter: `(created >= "${startDate.toISOString()}" && created <= "${endDate.toISOString()}") ${reportType != "" ? `type = "${reportType}"` : ""}`,
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
          created: result?.created,
          ems_pbso: result?.ems_pbso,
          injury: result?.injury,
          type: result?.type,
          phone_number: result?.phone_number,
          weather: result?.weather,
          narative: result?.narative?.replace("<p>", "").replace("</p>", ""),
          ai_generated_narative: result?.ai_generated_narative?.replace("<p>", "").replace("</p>", ""),
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
      // console.log("e: ", e)

      // @ts-expect-error fix types later
      const errData = e?.data
      let errMessage = "An error occured while retrieving reports"
      if (errData?.code === 404) {
        errMessage = errData?.message
        toast({
          variant: "destructive",
          title: "Failure",
          description: errMessage,
        })
      } else if (errData?.code === 400) {
        toast({
          variant: "destructive",
          title: "Failure",
          description: errData?.message,
        })
      } else {
        toast({
          variant: "destructive",
          title: "Failure",
          description: errMessage,
        })
      }
    } finally {
      setReportType("")
      setLoading(false)
    }
  }

  // TODO: implement sort for reports 
  // const handleReportSort = () => {
  //   console.log("Need to implement sorting for reports")
  // }

  useEffect(() => {
    const { startOfMonthDate, endOfMonthDate } = reportFilterStartAndEndOfMonthDates()
    getReports(startOfMonthDate, endOfMonthDate)
  }, [])

  return (
    <div>
      <div className="flex justify-between mb-2">
        <div className="flex items-center gap-2">
          <ReportFilter
            isFiltered={isFiltered}
            setIsFiltered={setIsFiltered}
            setReportType={setReportType}
            getReports={getReports}
          />

          {/*
            <Separator orientation="vertical" />

            <button
              className="flex items-center gap-1"
              onClick={handleReportSort}
            >
              <ArrowDownUp />
              Sort
            </button>
          */}

        </div>
        {/*
        <ReportCreate
          openSheet={openReportCreate}
          setOpenSheet={setOpenReportCreate}
          getReports={getReports}
        />
        */}

        <Link
          to="create"
          className="bg-black rounded-md text-white text-sm flex flex-row items-center p-2 pl-3 pr-3 hover:bg-black/85"
        >
          <Plus />
          Create Report
        </Link>
      </div>

      <div>
        <SplInput
          type="text"
          name="search"
          searchValue={searchReportValue}
          setSearchValue={setSearchReportValue}
          placeHolder="Address, type, resident, member number, etc..."
          styles="pt-5 pb-5 text-lg"
        />

        <PageInfoBar
          resultLength={searchResultLength}
          resultType=" report(s)"
          component={isFiltered ? <ClearFilter setIsFiltered={setIsFiltered} /> : <></>}
        />

        <ReportCardList
          reports={reports}
          searchValue={searchReportValue}
          setSearchResultLength={setSearchResultLength}
          loading={loading}
        />
      </div>
    </div >
  )
}

export default ReportComponent
