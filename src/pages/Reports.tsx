import ReportCardList from "@/components/ReportCardList"
import ReportFilter from "@/components/ReportFilter"
import { Button } from "@/components/ui/button"

const ReportPage = () => {
  return (
    <div>
      <div className="flex justify-between">
        <ReportFilter />
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

        <ReportCardList />
      </div>
    </div>
  )
}

export default ReportPage
