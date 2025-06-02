import SplInput from "./SplInput"
import { ArrowDownUp } from "lucide-react"
import HouseCheckList from "./HouseCheckList"
import { useCommunityStore } from "@/common/store"
import { useEffect, useState } from "react"
import { getFirstDateOfWeek, shouldHouseBeAddedToHouseCheckList } from "@/common/utils"
import PageInfoBar from "./PageInfoBar"
import { houseType } from "@/common/types"
// import { houseType } from "@/common/types"

const HouseCheckComponent = () => {
  const allHouses = useCommunityStore(state => state.houses)
  const housesToBeChecked = useCommunityStore(state => state.housesToBeChecked)
  const setHousesToBeChecked = useCommunityStore(state => state.setHousesToBeChecked)

  const [searchValue, setSearchValue] = useState("")
  const [sort, setSort] = useState(false)

  const filterForHousesToBeChecked = () => {
    const filterdList = allHouses.filter(house => {
      // console.log("house: ", house)

      // const currentDate = new Date()
      const houseCheckStartDate = new Date(house?.house_check_start_date)
      const houseCheckEndDate = new Date(house?.house_check_end_date)
      // const startOfWeekDate = getFirstDateOfWeek(currentDate, 'sunday')
      const houseLastChecked = house?.house_check_last_date === "" ? null : new Date(house?.house_check_last_date)

      // console.log("currentDate: ", currentDate)
      // console.log("houseCheckStartDate : ", houseCheckStartDate)
      // console.log("houseCheckEndDate : ", houseCheckEndDate)
      // console.log("date of start of week: ", startOfWeekDate)
      // console.log("lastChecked: ", houseLastChecked)

      const now = new Date()
      const shouldReturnHouse = shouldHouseBeAddedToHouseCheckList(now, houseCheckStartDate, houseCheckEndDate, houseLastChecked)
      // console.log("shouldReturnHouse: ", shouldReturnHouse)

      if (house?.house_check && shouldReturnHouse && searchValue === "") {
        console.log("house: ", house)
        return house
      } else if (house?.house_check && shouldReturnHouse && (
        house.address?.toLowerCase().includes(searchValue.toLowerCase()) ||
        house.apt?.toLowerCase().includes(searchValue.toLowerCase()) ||
        house.city?.toLowerCase().includes(searchValue.toLowerCase()) ||
        house.state?.toLowerCase().includes(searchValue.toLowerCase()) ||
        house.zip?.toLowerCase().includes(searchValue.toLowerCase()))
      ) {
        return house
      }
    })

    return filterdList
  }

  const sortHouseCheckList = (bool: boolean) => {
    // console.log("sorting...")

    const sortedItems = [...housesToBeChecked].sort((a: houseType, b: houseType) => {
      const addressA = a.address.toLowerCase()
      const addressB = b.address.toLowerCase()

      if (bool) {
        // ascending order
        // console.log("ascending order")

        if (addressA < addressB) {
          return -1;
        }
        if (addressA > addressB) {
          return 1;
        }

        // names must be equal
        return 0;
      } else {
        // descending order
        // console.log("ascending order")

        if (addressA < addressB) {
          return 1;
        }
        if (addressA > addressB) {
          return -1;
        }

        // names must be equal
        return 0;
      }

    })

    return sortedItems
  }

  useEffect(() => {
    setHousesToBeChecked(filterForHousesToBeChecked())
  }, [searchValue])

  useEffect(() => {
    setHousesToBeChecked(sortHouseCheckList(sort))
  }, [sort])

  // console.log("housesToBeChecked: ", housesToBeChecked)
  // console.log("sort: ", sort)
  // console.log("searchValue: ", searchValue)

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
        resultLength={housesToBeChecked.length}
        resultType=" house(s)"
        component={
          <button
            onClick={() => setSort(!sort)}
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
