import { reportType } from "@/common/types"
import ReportCard from "./ReportCard"
import { ScrollArea } from "./ui/scroll-area"
import { useEffect, useState } from "react"
import NoResultFound from "./NoResultsFound"
import Spinner from "./Spinner"
// import { useEffect, useState } from "react"

type CProps = {
  loading: boolean,
  reports: reportType[],
  searchValue: string,
  setSearchResultLength: React.Dispatch<React.SetStateAction<number>>,
}

const ReportCardList = ({ reports, searchValue, loading, setSearchResultLength }: CProps) => {
  const [searchResult, setSearchResult] = useState(() => (reports))

  const filterReports = () => {
    const result = reports.filter(report => {
      if (searchValue === "") return report
      if (report.house.address.toLowerCase().includes(searchValue.toLowerCase()) ||
        report.house.apt.toLowerCase().includes(searchValue.toLowerCase()) ||
        report.house.city.toLowerCase().includes(searchValue.toLowerCase()) ||
        report.house.state.toLowerCase().includes(searchValue.toLowerCase()) ||
        report.house.zip.toLowerCase().includes(searchValue.toLowerCase()) ||
        report.type.toLowerCase().includes(searchValue.toLowerCase()) ||
        report.resident.first_name.toLowerCase().includes(searchValue.toLowerCase()) ||
        report.resident.last_name.toLowerCase().includes(searchValue.toLowerCase()) ||
        report.member_number.toLowerCase().includes(searchValue.toLowerCase())
      ) return report
    })
    return result
  }

  useEffect(() => {
    const filteredResults = filterReports()
    setSearchResult(filteredResults)
    setSearchResultLength(filteredResults.length)
  }, [searchValue, reports])

  return (
    <>
      {loading ? <Spinner /> :
        searchResult.length === 0 ? <NoResultFound message="No reports found" /> : (
          <ScrollArea className="h-[80vh] mt-2">
            {searchResult?.map(report => (
              <ReportCard report={report} />
            ))}
          </ScrollArea>
        )}
    </>
  )
}

export default ReportCardList
