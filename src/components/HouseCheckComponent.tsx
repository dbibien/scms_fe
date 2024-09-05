import SplInput from "./SplInput"
import { ArrowDownUp } from "lucide-react"
import HouseCheckList from "./HouseCheckList"
import { useCommunityStore } from "@/common/store"
import { useEffect, useState } from "react"
import { getFirstDateOfWeek, shouldHouseBeAddedToHouseCheckList } from "@/common/utils"
import PageInfoBar from "./PageInfoBar"
// import { houseType } from "@/common/types"

const HouseCheckComponent = () => {
  const allHouses = useCommunityStore(state => state.houses)
  const setHousesToBeChecked = useCommunityStore(state => state.setHousesToBeChecked)

  const [searchValue, setSearchValue] = useState("")

  const filterForHousesToBeChecked = () => {
    const filterdList = allHouses.filter(house => {
      // console.log("house: ", house)

      const currentDate = new Date()
      const start = new Date(house?.house_check_start_date)
      const end = new Date(house?.house_check_end_date)
      const startOfWeekDate = getFirstDateOfWeek(currentDate, 'sunday')
      let lastChecked = house?.house_check_last_date === "" ? new Date(startOfWeekDate) : new Date(house?.house_check_last_date)
      lastChecked = new Date(lastChecked.setDate(lastChecked.getDate() - 1))
      // console.log("lastChecked: ", lastChecked)

      const shouldReturnHouse = shouldHouseBeAddedToHouseCheckList(start, end, lastChecked, currentDate, startOfWeekDate)
      // console.log("shouldReturnHouse: ", shouldReturnHouse)

      if (house?.house_check && shouldReturnHouse) {
        // console.log("house: ", house)
        return house
      }
    })

    return filterdList
  }

  const sortHouseCheckList = () => {
    console.log("sorting...")
  }

  useEffect(() => {
    setHousesToBeChecked(filterForHousesToBeChecked())
  }, [])

  // console.log("housesToBeChecked: ", housesToBeChecked)

  return (
    <div>
      <SplInput
        type="text"
        name="search"
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        placeHolder="Address, type, resident, member number, etc..."
        styles="pt-5 pb-5 text-lg"
      />

      <PageInfoBar
        resultLength={filterForHousesToBeChecked.length}
        resultType=" house(s)"
        component={
          <button
            onClick={sortHouseCheckList}
            className="text-slate-500 hover:text-black flex items-center gap-1">
            <ArrowDownUp />
            Sort
          </button>}
      />


      <HouseCheckList />
    </div>
  )
}

export default HouseCheckComponent
