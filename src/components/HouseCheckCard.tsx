
import { houseType } from "@/common/types"
import HomeAddress from "./HomeAddress"
import { Card, CardContent, CardTitle } from "./ui/card"

const HouseCheckCard = ({ house }: { house: houseType }) => {
  return (
    <Card>
      <CardTitle>
        <HomeAddress house={house} />
      </CardTitle>

      <CardContent>
        <p>Note:</p>
        <p>Some very important note to be said</p>
      </CardContent>
    </Card>
  )
}

export default HouseCheckCard 
