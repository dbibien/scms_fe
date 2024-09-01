import ReportComponent from "@/components/ReportComponent"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const ReportPage = () => {

  return (
    <Tabs defaultValue="reports" className="w-full">
      <TabsList>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="house_checks">House checks</TabsTrigger>
      </TabsList>
      <TabsContent value="reports">
        <ReportComponent />
      </TabsContent>
      <TabsContent value="house_checks">
        Change your house checks here.
      </TabsContent>
    </Tabs>
  )
}

export default ReportPage
