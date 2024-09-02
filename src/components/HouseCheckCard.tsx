
import { houseType } from "@/common/types"
import HomeAddress from "./HomeAddress"
import { Card, CardContent, CardTitle } from "./ui/card"
import Note from "./Note"

const HouseCheckCard = ({ house }: { house: houseType }) => {
  return (
    <Card className="p-2">
      <CardTitle className="text-lg text-slate-600">
        <HomeAddress house={house} />
      </CardTitle>

      <CardContent>
        {house?.note && (<>
          <div className="mt-4">
            <p className="text-sm underline text-slate-500">Note:</p>
            <Note note={house?.note} />
          </div>
        </>)
        }
      </CardContent>
    </Card>
  )
}

export default HouseCheckCard 
