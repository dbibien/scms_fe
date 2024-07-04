import { ScrollArea } from "@/components/ui/scroll-area"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
import SplInput from "@/components/SplInput"
import { useEffect, useState } from "react"
import { useApplicationStore, useCommunityStore } from "@/common/store"
import { concernType } from "@/common/types"
// import { Sheet, SheetTrigger } from "@/components/ui/sheet"
// import { Pen } from "lucide-react"
import ConcernCard from "@/components/ConcernCard"

// helper component

const ConcernsPage = () => {
  // STORE
  const pb = useApplicationStore(state => state.pb)
  const concerns = useCommunityStore(state => state.concerns)
  const setConcerns = useCommunityStore(state => state.setConcerns)

  // STATE
  const [searchValue, setSearchValue] = useState("")
  const [filteredConcerns, setFilteredConcerns] = useState(concerns)

  // HANDLERS
  const getConcerns = async () => {
    try {
      // fields the backend should return
      const concernsFields = `
        expand.concerns.id, expand.concerns.name, expand.concerns.hint, expand.concerns.say 
      `
      const fields = `${concernsFields}`
      const records = await pb.collection('communities').getFullList({
        expand: 'concerns',
        fields: fields,
      })

      // console.log("records: ", records)
      // console.log("records.expand: ", records[0].expand?.concerns)
      const concerns = records[0].expand?.concerns === undefined ? [] : records[0].expand?.concerns
      setConcerns(concerns)
    } catch (e) {
      console.log("e:", e)
    }
  }

  const handleSearchConcerns = (concern: concernType) => {
    if (searchValue === "") return concern

    if (concern.name.toLowerCase().includes(searchValue.toLowerCase())) return concern
  }

  // EFFECTS
  useEffect(() => {
    getConcerns()
  }, [])

  useEffect(() => {
    setFilteredConcerns(() => concerns?.filter(handleSearchConcerns))
  }, [searchValue])

  // console.log("concerns: ", concerns)

  // JSX
  return (
    <div>
      <SplInput
        type="text"
        name="search"
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        placeHolder="search concerns..."
        styles="pt-5 pb-5 text-lg"
      />

      <div className="mt-4">
        <p className="text-slate-400 text-sm">Showing {filteredConcerns?.length} concern(s)</p>
      </div>

      {filteredConcerns?.length === 0 && (
        <p className="text-center mt-4 text-gray-400">No concerns</p>
      )}

      <ScrollArea className="h-[100vh] mt-4">
        {filteredConcerns?.map(concern => (
          <ConcernCard
            key={concern?.id}
            concern={concern}
          />
        ))}
      </ScrollArea>
    </div>
  )
}

export default ConcernsPage
