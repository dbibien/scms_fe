import SInput from "@/components/SInput"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@radix-ui/react-separator"
import { PhoneCall } from 'lucide-react'
import { Pencil } from 'lucide-react'
import { Info } from 'lucide-react'
import { Home } from 'lucide-react'
import { useEffect, useState } from "react"
import PocketBase from "pocketbase"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import CheckBox from "@/components/CheckBox";



type houseRecords = {
  id: string,
  address: string,
  member_number: string,
  security_code: string,
  image: string,
  note: string,
  expand: {
    phones: {
      id: string
      phone_number: string,
      primary: boolean,
      type: "home" | "cell" | "business"
    }[],
    residents: {
      id: string,
      first_name: string,
      last_name: string,
      owner: boolean,
    }[],
  },
}

const HomeCard = ({ id, image, address, member_number, security_code, note, expand }: houseRecords) => {
  return (
    // src="https://photos.zillowstatic.com/fp/eb044d5179496b1ca6030f016d6bb13a-cc_ft_768.webp"
    <Card className="mb-8 lg:grid lg:grid-cols-2">
      <CardHeader className="p-0">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/api/files/houses/${id}/${image}`}
          width="100%"
          height="auto"
          className="rounded-t-md object-cover"
        />
      </CardHeader>

      <div>
        <CardContent className="pt-2">
          <p className="text-center">{address}</p>

          <div className="pt-4 flex flex-row justify-center gap-2">
            {expand?.residents.map(resident => {
              return (
                <div key={resident.id}>
                  <p>{resident?.first_name} {resident?.last_name}</p>
                  {expand?.residents.length > 1 && (
                    <Separator orientation="vertical" className="border border-slate-200" />
                  )}
                </div>
              )
            })}
          </div>

          <div className="pt-4 flex flex-row justify-center gap-2">
            <p>Member: {member_number}</p>
            <Separator orientation="vertical" className="border border-slate-200" />
            <p>Security code: {security_code}</p>
          </div>

          <Separator className="mt-8 border border-slate-200" />
        </CardContent>

        <CardFooter className="flex flex-row justify-between items-center">
          <Sheet>
            <SheetTrigger>
              <PhoneCall />
            </SheetTrigger>

            <SheetContent side="bottom">
              <SheetHeader>
                <SheetTitle>
                  Select concerns
                </SheetTitle>

                <p className="text-center text-gray-600">{address}</p>
              </SheetHeader>

              <ScrollArea>
                <p>Hello there...</p>

                <CheckBox id="test" name="Garage door open" hint="Inform resident of open garage door" />
              </ScrollArea>
            </SheetContent>


          </Sheet>

          <Pencil />
        </CardFooter>
      </div>
    </Card>
  )
}

const HomePage = ({ pb }: { pb: PocketBase }) => {
  const [houses, setHouses] = useState<houseRecords[]>([])

  useEffect(() => {
    const getAllHouses = async () => {
      try {
        // fields the backend should return
        const fields = `id, address, member_number, security_code, image, note,
              expand.residents.id, expand.residents.first_name, expand.residents.last_name, expand.residents.owner,
              expand.phones.id, expand.phones.phone_number, expand.phones.primary, expand.phones.type,
        `
        const records = await pb.collection('houses').getFullList({
          // sort: "-created",
          expand: 'residents, phones',
          fields: fields,
        })

        // console.log("records: ", records)
        //@ts-expect-error this is just the best way I could come up with to get the error to go away
        setHouses(records)
      } catch (e) {
        console.log("e:", e)
      }
    }

    getAllHouses()
  }, [])

  // console.log("house: ", houses)

  return (
    <div className="mt-4 p-2 md:max-w-[70%] md:m-auto">

      <SInput type="text" name="search" placeHolder="search homes..." styles="pt-5 pb-5 text-lg" />

      {!houses && (
        <div>
          <div className="bg-amber-100 md:max-w-[50%] m-auto mt-4 p-4 rounded-md">
            <Info color="orange" />
            <p className="text-center">No homes found</p>
          </div>

          <div className="mt-4 flex flex-row justify-center">
            <Button className="flex flex-row  gap-2 items-end w-full">
              <Home />
              Add New Home
            </Button>
          </div>
        </div>
      )}

      <div className="mt-4 pb-40 h-[100vh] overflow-hidden overflow-y-auto">
        {houses.map((house) => {
          return <HomeCard key={house.id} {...house} />
        })}

      </div>
    </div>
  )
}

export default HomePage

// <HomeCard img="https://photos.zillowstatic.com/fp/6a98016b24a7b2ccf20821306f2b589d-sc_1920_1280.webp" />
// <HomeCard img="https://photos.zillowstatic.com/fp/eb044d5179496b1ca6030f016d6bb13a-cc_ft_768.webp" />
// <HomeCard img="https://photos.zillowstatic.com/fp/923ccef6439fa33f1e290982783f0307-sc_1920_1280.webp" />
// <HomeCard img="https://photos.zillowstatic.com/fp/98de88bcef350d833a76824e10b9d5ad-cc_ft_1536.webp" />
