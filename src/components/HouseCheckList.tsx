import { houseType } from "@/common/types"
import HouseCheckCard from "./HouseCheckCard"
import { ScrollArea } from "./ui/scroll-area"

const HouseCheckList = ({ housesToBeChecked }: { housesToBeChecked: houseType[] | undefined }) => {
  return (
    <ScrollArea className="h-[70vh]">
      {
        housesToBeChecked?.map((house: houseType) => (<HouseCheckCard key={house?.id} house={house} />))
      }
    </ScrollArea>
  )
}

export default HouseCheckList 
