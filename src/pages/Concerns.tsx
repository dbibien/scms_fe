import { ScrollArea } from "@/components/ui/scroll-area"
import SplInput from "@/components/SplInput"
import { useEffect, useState } from "react"
import { useApplicationStore, useCommunityStore, useLoggedInUserStore } from "@/common/store"
import { concernType } from "@/common/types"
import ConcernCard from "@/components/ConcernCard"
import { toast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom"
import ConcernCardCreate from "@/components/concernCardCreate"
// import { Button } from "@/components/ui/button"
// import { Plus } from "lucide-react"

const ConcernsPage = () => {
  // STORE
  const pb = useApplicationStore(state => state.pb)
  const loggedInUserId = useLoggedInUserStore(state => state.user.id)
  const loggedInUserCommunityId = useLoggedInUserStore(state => state.user.community_id)
  const concerns = useCommunityStore(state => state.concerns)
  const setConcerns = useCommunityStore(state => state.setConcerns)

  // STATE
  const [searchValue, setSearchValue] = useState("")
  const [filteredConcerns, setFilteredConcerns] = useState(concerns)

  const navigate = useNavigate()

  // HANDLERS
  const getConcerns = async () => {
    try {
      const records: concernType[] = await pb.collection('concerns').getFullList({
        filter: `community.id = "${loggedInUserCommunityId}"`,
        fields: "id, name, hint, say",
      })

      console.log("records: ", records)
      // console.log("records.expand: ", records[0].expand?.concerns)
      // const concerns = records[0].expand?.concerns === undefined ? [] : records[0].expand?.concerns
      setConcerns(records)
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
  }, [searchValue, concerns])

  // console.log("concerns: ", concerns)

  useEffect(() => {
    if (loggedInUserId === "") { // if there is no looged in user in the global store, an update cannot happen
      toast({
        variant: "destructive",
        title: "Warning",
        description: "No user found. Loging out...",
      })
      // console.log("no user found. loging out...")
      setTimeout(() => { // time out ensure the toast will have enough time to be shown to the user
        pb.authStore.clear()
        return navigate("/login")
      }, 2000)
    }
  }, [loggedInUserId])

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

      <div className="flex flex-row items-center justify-between mt-4">
        <p className="text-slate-400 text-sm">Showing {filteredConcerns?.length} concern(s)</p>
        <ConcernCardCreate />
      </div>

      {filteredConcerns?.length === 0 && (
        <p className="text-center mt-4 text-gray-400">No concerns</p>
      )}

      <ScrollArea className="h-[80vh] mt-4 pb-8">
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
