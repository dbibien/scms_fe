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
