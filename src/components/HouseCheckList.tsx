import { houseType } from "@/common/types"
import HouseCheckCard from "./HouseCheckCard"

const HouseCheckList = ({ housesToBeChecked }: { housesToBeChecked: houseType[] | undefined }) => {
  return (
    <div>
      {
        housesToBeChecked?.map((house: houseType) => (<HouseCheckCard key={house?.id} house={house} />))
      }
    </div>
  )
}

export default HouseCheckList 
