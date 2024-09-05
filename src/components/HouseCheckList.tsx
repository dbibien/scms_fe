import { houseType } from "@/common/types"
import HouseCheckCard from "./HouseCheckCard"
import { ScrollArea } from "./ui/scroll-area"
import { useCommunityStore } from "@/common/store"
import NoResultFound from "./NoResultsFound"

// const HouseCheckList = ({ housesToBeChecked }: { housesToBeChecked: houseType[] | undefined }) => {
const HouseCheckList = () => {
  const housesToBeChecked = useCommunityStore(state => state.housesToBeChecked)

  return (
    <ScrollArea className="h-[70vh]">
      {
        housesToBeChecked.length < 1 ? <NoResultFound message='No houses found' /> :

          housesToBeChecked?.map((house: houseType) => (<HouseCheckCard key={house?.id} house={house} />))
      }
    </ScrollArea>
  )
}

export default HouseCheckList 
