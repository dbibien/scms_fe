import { reportType } from "@/common/types"
import PageInfoBar from "@/components/PageInfoBar"
import ReportCardList from "@/components/ReportCardList"
import ReportFilter from "@/components/ReportFilter"
import SplInput from "@/components/SplInput"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { useState } from "react"

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

const ReportPage = () => {
  const [reports, setReports] = useState<reportType[] | []>([])
  const [searchReportValue, setSearchReportValue] = useState("")
  const [searchResultLength, setSearchResultLength] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [isFiltered, setIsFiltered] = useState(false)

  return (
    <div>
      <div className="flex justify-between mb-2">
        <ReportFilter
          isFiltered={isFiltered}
          setReports={setReports}
          setLoading={setLoading}
          setIsFiltered={setIsFiltered}
        />
        <Button>Create report</Button>
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

export default ReportPage
