import { ReactNode } from "react"

type CProps = {
  resultLength: number
  resultType?: string
  component: ReactNode
}

const PageInfoBar = ({ resultLength, resultType, component }: CProps) => {
  return (
    <div className="flex flex-row items-center justify-between mt-4">
      <p className="text-slate-400 text-sm">Showing {resultLength} {resultType}</p>
      {component}
    </div>
  )
}

export default PageInfoBar
