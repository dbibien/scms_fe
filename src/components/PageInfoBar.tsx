import { useLoggedInUserStore } from "@/common/store"
import { ReactNode } from "react"

type CProps = {
  resultLength: number
  resultType?: string
  component: ReactNode
}

const PageInfoBar = ({ resultLength, resultType, component }: CProps) => {
  const loggedInUserType = useLoggedInUserStore(state => state.user.type)

  return (
    <div className="flex flex-row items-center justify-between mt-4">
      <p className="text-slate-400 text-sm">Showing {resultLength} {resultType}</p>
      {loggedInUserType === "director" && component}
    </div>
  )
}

export default PageInfoBar
