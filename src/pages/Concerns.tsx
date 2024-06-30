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
import { useApplicatonStore } from "@/common/store"

const ConcernsPage = () => {
  const pb = useApplicatonStore(state => state.pb)
  const [searchHomeValue, setSearchHomeValue] = useState("")


  const getAllConcerns = async () => {
    try {
      // fields the backend should return
      const fields = `id, name, hint`
      const records = await pb.collection('concerns').getFullList({
        fields: fields,
      })
      // TODO: add filter to only retrieve the concerns that belong to the community the user belongs to
      
      console.log("records: ", records)
      //@ts-expect-error this is just the best way I could come up with to get the error to go away
      setConcerns(records)
    } catch (e) {
      console.log("e:", e)
    }
  }

  useEffect(()=>{
    getAllConcerns()
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
