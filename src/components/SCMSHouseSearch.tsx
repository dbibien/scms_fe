import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useCommunityStore } from "@/common/store"
import { useState } from "react"
import HomeAddress from "./HomeAddress"

const SCMSHouseSearch = () => {
  const houses = useCommunityStore(state => state.houses)

  const [searchInput, setSearchInput] = useState("")

  return (
    <div className="mt-4">
      <p className="text-sm font-medium">House: </p>
      <div className="flex items-center border-[1px] border-slate-200 p-1 rounded-t-md">
        <Search className="text-slate-300" />
        <Input
          type="text"
          placeholder="Search home..."
          className="focus-visible:ring-0 border-none rounded-none"
          onChange={e => setSearchInput(e.target.value)}
        />
      </div>

      <div className="flex flex-col border-l-[1px] border-r-[1px] border-b-[1px] border-slate-200 p-1 rounded-b-md space-y-3 max-h-40 overflow-scroll">
        {houses?.map(house => (
          <Button
            key={house?.id}
            className="bg-slate-50 text-black hover:bg-slate-100 inline-block"
          >
            <HomeAddress house={house} />
          </Button>
        ))}
      </div>
    </div>
  )
}

export default SCMSHouseSearch 
