import SplInput from "@/components/SplInput"
import { useState } from "react"

const ConcernsPage = () => {
  const [searchHomeValue, setSearchHomeValue] = useState("")

  return (
    <div>
      <SplInput
        type="text"
        name="search"
        searchValue={searchHomeValue}
        setSearchValue={setSearchHomeValue}
        placeHolder="search concerns..."
        styles="pt-5 pb-5 text-lg"
      />
    </div>
  )
}

export default ConcernsPage
