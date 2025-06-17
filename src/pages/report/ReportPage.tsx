import HouseCheckComponent from "@/components/HouseCheckComponent"
import ReportComponent from "@/components/ReportComponent"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Outlet } from "react-router-dom"

const ReportPage = () => {
  return (
    <Tabs defaultValue="reports" className="w-full">
      <TabsList>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="house_checks">House checks</TabsTrigger>
      </TabsList>

      <TabsContent value="reports">
        <ReportComponent />
        <Outlet />
      </TabsContent>

      <TabsContent value="house_checks">
        <HouseCheckComponent />
      </TabsContent>
    </Tabs>
  )
}

export default ReportPage
