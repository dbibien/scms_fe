import { houseType } from "@/common/types"
import HouseCheckCard from "./HouseCheckCard"

const HouseCheckList = ({ housesToBeChecked }: { housesToBeChecked: houseType[] | undefined }) => {
  return (
    <div className="space-y-4">
      {
        housesToBeChecked?.map((house: houseType) => (<HouseCheckCard key={house?.id} house={house} />))
      }
    </div>
  )
}

export default HouseCheckList 
