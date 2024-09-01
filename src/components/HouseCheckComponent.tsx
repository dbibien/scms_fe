import { useState } from "react"
import SplInput from "./SplInput"

const HouseCheckComponent = () => {
  const [searchValue, setSearchValue] = useState("")

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
    </div>
  )
}

export default HouseCheckComponent
