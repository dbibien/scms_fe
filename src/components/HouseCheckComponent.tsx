import SplInput from "./SplInput"
import { ArrowDownUp } from "lucide-react"
import HouseCheckList from "./HouseCheckList"
import { useCommunityStore } from "@/common/store"
import { useEffect, useState } from "react"
import { houseType } from "@/common/types"

const HouseCheckComponent = () => {
  const allHouses = useCommunityStore(state => state.houses)

  const [housesToBeChecked, setHousesToBeChecked] = useState<houseType[]>()
  const [searchValue, setSearchValue] = useState("")

  const filterForHousesToBeChecked = () => (allHouses.filter(house => house?.house_check))

  useEffect(() => {
    setHousesToBeChecked(filterForHousesToBeChecked())
  }, [])

  return (
    <div>
      <ArrowDownUp />

      <SplInput
        type="text"
        name="search"
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        placeHolder="Address, type, resident, member number, etc..."
        styles="pt-5 pb-5 text-lg"
      />

      <HouseCheckList
        housesToBeChecked={housesToBeChecked}
      />
    </div>
  )
}

export default HouseCheckComponent
