
import { houseType } from "@/common/types"
import HomeAddress from "./HomeAddress"
import { Card, CardContent, CardTitle } from "./ui/card"
import Note from "./Note"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Label } from "./ui/label"

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

        <div className="mt-4">
          <p className="text-md font-semibold mb-2">Is everything oK?</p>
          <RadioGroup defaultValue="option-one">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-one" id="option-one" />
              <Label htmlFor="option-one">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-two" id="option-two" />
              <Label htmlFor="option-two">No</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  )
}

export default HouseCheckCard 
