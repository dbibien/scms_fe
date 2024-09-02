import { houseType } from "@/common/types"
import HouseCheckCard from "./HouseCheckCard"
import { ScrollArea } from "./ui/scroll-area"
import { useCommunityStore } from "@/common/store"

// const HouseCheckList = ({ housesToBeChecked }: { housesToBeChecked: houseType[] | undefined }) => {
const HouseCheckList = () => {
  const housesToBeChecked = useCommunityStore(state => state.housesToBeChecked)

  return (
    <ScrollArea className="h-[70vh]">
      {
        housesToBeChecked?.map((house: houseType) => (<HouseCheckCard key={house?.id} house={house} />))
      }
    </ScrollArea>
  )
}

export default HouseCheckList 
