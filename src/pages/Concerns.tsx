import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import SplInput from "@/components/SplInput"
import { useEffect, useState } from "react"
import { useApplicationStore, useCommunityStore } from "@/common/store"
import { concernType } from "@/common/types"

type concernCardType = {
  concern: concernType,
}

// helper component
const ConcernCard = ({ concern }: concernCardType) => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{concern?.name}</CardTitle>
        <CardDescription>{concern?.hint}</CardDescription>
      </CardHeader>

      <CardContent>
        <p>{concern?.say}</p>
      </CardContent>

      <CardFooter>
      </CardFooter>
    </Card>
  )
}

const ConcernsPage = () => {
  const pb = useApplicationStore(state => state.pb)
  const concerns = useCommunityStore(state => state.concerns)
  const setConcerns = useCommunityStore(state => state.setConcerns)

  const [searchHomeValue, setSearchHomeValue] = useState("")

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

  useEffect(() => {
    getConcerns()
  }, [])

  // console.log("concerns: ", concerns)
  // BUG: ScrollArea not scrolling
  // BUG: html p tags are being shown on the concerns page

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

      {
        concerns.length === 0 && (
          <p className="text-center mt-4 text-gray-400">No concerns</p>
        )
      }

      <ScrollArea className="mt-4">
        {concerns?.map(concern => (
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
