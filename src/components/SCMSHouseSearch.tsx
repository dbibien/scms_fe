import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useCommunityStore } from "@/common/store"
import { useEffect, useState } from "react"
import HomeAddress from "./HomeAddress"
import { houseType } from "@/common/types"

type CProps = {
  setHouse: React.Dispatch<React.SetStateAction<houseType | undefined>>,
}

const SCMSHouseSearch = ({ setHouse }: CProps) => {
  const houses = useCommunityStore(state => state.houses)

  const [searchInput, setSearchInput] = useState("")
  const [expand, setExpand] = useState(false)
  const [filteredResult, setFilteredResult] = useState<houseType[]>([])

  const filterHousesBySearchedValue = (house: houseType) => {
    const searchedValueLowerCase = searchInput.toLowerCase()
    if (searchedValueLowerCase === "") {
      return
    } else if (
      house.address.toLowerCase().includes(searchedValueLowerCase) ||
      house.apt.toLowerCase().includes(searchedValueLowerCase) ||
      house.city.toLowerCase().includes(searchedValueLowerCase) ||
      house.state.toLowerCase().includes(searchedValueLowerCase) ||
      house.zip.toLowerCase().includes(searchedValueLowerCase) ||
      house.security_code.toLowerCase().includes(searchedValueLowerCase) ||
      house.member_number.toLowerCase().includes(searchedValueLowerCase)
    ) {
      return house
    }
  }

  const handleSelectHouse = (house: houseType) => {
    setSearchInput(`${house?.address} ${house?.apt} ${house?.city} ${house?.state} ${house?.zip}`)
    setHouse(house)
    setExpand(false)
  }

  useEffect(() => {
    const result = houses?.filter(filterHousesBySearchedValue)
    setFilteredResult(result)

    if (result.length > 0) {
      setExpand(true)
    } else {
      setExpand(false)
    }

    if (searchInput.length === 0) setHouse(undefined) // remove the selected house if no result is found
  }, [searchInput])

  return (
    <div className="mt-4">
      <p className="text-sm font-medium">House: </p>
      <div className="flex items-center border-[1px] border-slate-200 p-1 rounded-t-md">
        <Search className="text-slate-300" />
        <Input
          type="text"
          placeholder="Search home..."
          className="focus-visible:ring-0 border-none rounded-none"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />
      </div>

      {expand && (
        <div className="flex flex-col border-l-[1px] border-r-[1px] border-b-[1px] border-slate-200 p-1 rounded-b-md space-y-3 max-h-40 overflow-scroll">
          {filteredResult.map(house => (
            <Button
              key={house?.id}
              className="bg-slate-50 text-black hover:bg-slate-100 inline-block"
              onClick={() => handleSelectHouse(house)}
            >
              <HomeAddress house={house} />
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}

export default SCMSHouseSearch 
