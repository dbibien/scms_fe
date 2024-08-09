import { ScrollArea } from "@/components/ui/scroll-area"
import SplInput from "@/components/SplInput"
import { useEffect, useState } from "react"
import { useApplicationStore, useCommunityStore, useLoggedInUserStore } from "@/common/store"
import { concernType } from "@/common/types"
import ConcernCard from "@/components/ConcernCard"
import { toast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom"
import ConcernCardCreate from "@/components/concernCardCreate"
import PageInfoBar from "@/components/PageInfoBar"
import NoResultFound from "@/components/NoResultsFound"

const ConcernsPage = () => {
  // STORE
  const pb = useApplicationStore(state => state.pb)
  const loggedInUserId = useLoggedInUserStore(state => state.user.id)
  const loggedInUserCommunityId = useLoggedInUserStore(state => state.user.community_id)
  const loggedInUserType = useLoggedInUserStore(state => state.user.type)
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

      // console.log("records: ", records)
      // console.log("records.expand: ", records[0].expand?.concerns)
      // const concerns = records[0].expand?.concerns === undefined ? [] : records[0].expand?.concerns
      setConcerns(records)
    } catch (e) {
      // console.log("e:", e?.data)

      // @ts-expect-error fix types later
      const errData = e?.data
      if (errData?.code === 400) {
        toast({
          variant: "destructive",
          title: "Fail",
          description: errData?.message,
        })
      }
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
        placeHolder="Search concerns..."
        styles="pt-5 pb-5 text-lg"
      />

      <PageInfoBar
        resultLength={filteredConcerns?.length}
        resultType=" concern(s)"
        component={loggedInUserType === "director" && <ConcernCardCreate />}
      />

      {filteredConcerns?.length === 0 && (
        <NoResultFound message='No concerns found' />
      )}

      <ScrollArea className="h-[73vh] lg:h-[80vh] mt-4 pb-8">
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
