import { selectConcernsType } from "@/common/types"
import { CircleX } from "lucide-react"

type CProps = {
  selectConcerns: selectConcernsType[]
  handleRemoveConcern: (id: string) => void 
}

const ConcernSelectorViewer = ({selectConcerns, handleRemoveConcern}: CProps) => {
  return (
    <div className="pb-2 grid grid-cols-3 gap-2">
      {
        selectConcerns?.map(concern => (
          <div
            key={concern.id}
            className="bg-green-100 inline-block p-1 rounded-lg"
          >
            <div className="flex flex-row justify-end">
              <button
                onClick={() => handleRemoveConcern(concern.id)}>
                <CircleX size={15} color="#f87171" />
              </button>
            </div>
            <p className="text-center text-green-500 text-xs font-semibold">{concern.name}</p>
          </div>
        ))
      }
    </div>
  )
}

export default ConcernSelectorViewer
