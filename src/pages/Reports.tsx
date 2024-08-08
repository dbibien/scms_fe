import { reportType } from "@/common/types"
import PageInfoBar from "@/components/PageInfoBar"
import ReportCardList from "@/components/ReportCardList"
import ReportFilter from "@/components/ReportFilter"
import SplInput from "@/components/SplInput"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const ReportPage = () => {
  const [reports, setReports] = useState<reportType[] | []>([])
  const [searchReportValue, setSearchReportValue] = useState("")
  const [searchResultLength, setSearchResultLength] = useState<number>(0)

  return (
    <div>
      <div className="flex justify-between mb-2">
        <ReportFilter setReports={setReports} />
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
          component={<></>}
        />

        <ReportCardList reports={reports} searchValue={searchReportValue} setSearchResultLength={setSearchResultLength} />
      </div>
    </div >
  )
}

export default ReportPage
