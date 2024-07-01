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
import { useApplicationStore, useConcernStore } from "@/common/store"

const ConcernsPage = () => {
  const pb = useApplicationStore(state => state.pb)
  const setConcerns = useConcernStore(state => state.setConcerns)

  const [searchHomeValue, setSearchHomeValue] = useState("")


  const getApplicationData = async () => {
    try {
      // fields the backend should return
      const residentFields = `
        expand.houses.expand.residents.id, expand.houses.expand.residents.first_name, expand.houses.expand.residents.last_name, 
        expand.houses.expand.residents.owner
      `
      const houseFields = `
        expand.houses.id, expand.houses.address, expand.houses.member_number, expand.houses.security_code, expand.houses.image, expand.houses.note
      `
      const concernsFields = `
        expand.concerns.id, expand.concerns.name, expand.concerns.hint, expand.concerns.say 
      `
      const communityFields = `
        id, name, address
      `
      const phoneFields = `
        expand.houses.expand.phones.id, expand.houses.expand.phones.phone_number, expand.houses.expand.phones.primary, expand.houses.expand.phones.type
      `
      const fields = `${communityFields}, ${concernsFields}, ${houseFields}, ${residentFields}, ${phoneFields}`
      const records = await pb.collection('communities').getFullList({
        expand: 'concerns, houses, houses.residents, houses.phones',
        fields: fields,
      })

      console.log("records: ", records)
      //@ts-expect-error this is just the best way I could come up with to get the error to go away
      setConcerns(records)
    } catch (e) {
      console.log("e:", e)
    }
  }

  useEffect(() => {
    getApplicationData()
  }, [])

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


      <ScrollArea className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Garage Door open</CardTitle>
            <CardDescription>Inform resident of open garage door</CardDescription>
          </CardHeader>

          <CardContent>
            <p>Some content</p>
          </CardContent>

          <CardFooter>
          </CardFooter>
        </Card>
      </ScrollArea>
    </div>
  )
}

export default ConcernsPage
