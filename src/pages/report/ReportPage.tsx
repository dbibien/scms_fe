import PageHeader from "@/components/PageHeader/PageHeader"
import ReportComponent from "@/components/ReportComponent"
import { Outlet } from "react-router-dom"

const ReportPage = () => {
  return (
    <>
      <PageHeader title="Reports" />
      <ReportComponent />
      <Outlet />
    </>
  )
}

export default ReportPage
