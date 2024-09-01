import { useState } from "react"
import SplInput from "./SplInput"
import { ArrowDownUp } from "lucide-react"
import HouseCheckList from "./HouseCheckList"

const HouseCheckComponent = () => {
  const [searchValue, setSearchValue] = useState("")

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

      <HouseCheckList />
    </div>
  )
}

export default HouseCheckComponent
