import ReportCard from "@/components/ReportCard"
import ReportFilter from "@/components/ReportFilter"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

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

        <ScrollArea className="h-[80vh] mt-2">
          <ReportCard />
          <ReportCard />
          <ReportCard />
          <ReportCard />
          <ReportCard />
        </ScrollArea>
      </div>
    </div>
  )
}

export default ReportPage
