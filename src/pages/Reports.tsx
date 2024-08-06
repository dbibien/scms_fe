import { reportType } from "@/common/types"
import ReportCardList from "@/components/ReportCardList"
import ReportFilter from "@/components/ReportFilter"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const ReportPage = () => {
  const [reports, setReports] = useState<reportType[] | []>([])

  console.log("reports: ", reports)

  return (
    <div>
      <div className="flex justify-between">
        <ReportFilter setReports={setReports} />
        <Button>Create report</Button>
      </div>

      <div>
        {/*
          <SplInput
            type="text"
            name="search"
            searchValue={searchHomeValue}
            setSearchValue={setSearchHomeValue}
            placeHolder="Search homes..."
            styles="pt-5 pb-5 text-lg"
          />
        */}

        <ReportCardList reports={reports} />
      </div>
    </div>
  )
}

export default ReportPage
