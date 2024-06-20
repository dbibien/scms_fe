import SInput from "@/components/SInput"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@radix-ui/react-separator"
import { Phone, PhoneCall, Ban } from 'lucide-react'
import { Pencil } from 'lucide-react'
import { Info } from 'lucide-react'
import { Home } from 'lucide-react'
import { useEffect, useState } from "react"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import CheckBox from "@/components/CheckBox"
import { useApplicatonStore } from "@/common/store";


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
  const pb = useApplicatonStore(state => state.pb)

  const callResident = async () => {
    console.log("calling resident...")

    const res = await pb.send(`/api/scms/call-resident`, {
      headers: {

        "Authorization": `${pb.authStore.token} `
      }
    })
    const data = res.json()
    console.log("data: ", data)
  }

  // const callResident = async () => {
  //   console.log("calling resident...")
  //
  //   // const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/scms/call-resident`)
  //   const res = await fetch("http://127.0.0.1:8090/api/scms/call-resident")
  //   const data = await res.json()
  //   console.log("data: ", data)
  // }


  return (
    // src="https://photos.zillowstatic.com/fp/eb044d5179496b1ca6030f016d6bb13a-cc_ft_768.webp"
    // <Card className="mb-8 lg:grid lg:grid-cols-2">
    <Card className="mb-8 lg:grid lg:grid-cols-[2fr_2fr_2fr]">
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
                <SheetTitle className="text-center">
                  Select concerns
                </SheetTitle>

                <p className="text-center text-gray-600">{address}</p>
                <Separator orientation="horizontal" className="border border-slate-200" />
              </SheetHeader>

              <div className="mt-4 pl-2 pr-2 pb-2 lg:w-[50%] lg:mx-auto">

                <div className="p-4 grid grid-cols-3 gap-2">
                    <p className="bg-green-100 inline-block p-1 rounded-lg text-center text-green-500 text-xs font-semibold">Gagrage door open</p>
                    <p className="bg-green-100 inline-block p-1 rounded-lg text-center text-green-500 text-xs font-semibold">Sprinkers on</p>
                    <p className="bg-green-100 inline-block p-1 rounded-lg text-green-500 text-xs font-semibold">Garbage bin out</p>
                    <p className="bg-green-100 inline-block p-1 rounded-lg text-green-500 text-xs font-semibold">Garage lights are out</p>
                    <p className="bg-green-100 inline-block p-1 rounded-lg text-green-500 text-xs font-semibold">Some other stuff</p>
                    <p className="bg-green-100 inline-block p-1 rounded-lg text-green-500 text-xs font-semibold">Even some more other stuff</p>
                </div>


                <SInput type="text" name="search" placeHolder="search concerns..." styles="pt-5 pb-5 mb-4 text-lg" />

                <ScrollArea className="h-80 bg-slate-50">
                  <CheckBox id="test" name="Garage door open" hint="Inform resident of open garage door" />
                  <CheckBox id="test" name="Sprinkler system is on" hint="Inform resident that the sprinkler system is on" />
                  <CheckBox id="test" name="Garage door open" hint="Inform resident of open garage door" />
                  <CheckBox id="test" name="Garage door open" hint="Inform resident of open garage door" />
                  <CheckBox id="test" name="Garage door open" hint="Inform resident of open garage door" />
                  <CheckBox id="test" name="Garage door open" hint="Inform resident of open garage door" />
                  <CheckBox id="test" name="Trash is out on the wrong day" hint="Inform resident that their trash is out on the wrong day" />
                  <CheckBox id="test" name="Garage door open" hint="Inform resident of open garage door" />
                  <CheckBox id="test" name="Garage door open" hint="Inform resident of open garage door" />
                  <CheckBox id="test" name="Garage door open" hint="Inform resident of open garage door" />
                  <CheckBox id="test" name="Garage door open" hint="Inform resident of open garage door" />
                  <CheckBox id="test" name="Garage door open" hint="Inform resident of open garage door" />
                  <CheckBox id="test" name="Garage door open" hint="Inform resident of open garage door" />
                  <CheckBox id="test" name="Garage door open" hint="Inform resident of open garage door" />
                  <CheckBox id="test" name="Garage door open" hint="Inform resident of open garage door" />
                  <CheckBox id="test" name="Garage door open" hint="Inform resident of open garage door" />
                  <CheckBox id="test" name="Garage door open" hint="Inform resident of open garage door" />
                  <CheckBox id="test" name="Garage door open" hint="Inform resident of open garage door" />
                  <CheckBox id="test" name="Garage door open" hint="Inform resident of open garage door" />
                  <CheckBox id="test" name="Garage door open" hint="Inform resident of open garage door" />
                  <CheckBox id="test" name="Garage door open" hint="Inform resident of open garage door" />
                </ScrollArea>

                <Sheet>
                  <SheetTrigger className="w-full">
                    <Button
                      className="flex flex-row  gap-2 items-end w-full mt-4"
                    >
                      <Phone />
                      Reach Out To Resident
                    </Button>
                  </SheetTrigger>

                  <SheetContent
                    side="bottom"
                  >
                    <div className="lg:w-[50%] lg:mx-auto">
                      <h3 className="text-center text-xl font-bold-[400px]">
                        Are you sure you want to call the resident?
                      </h3>

                      <div className="grid grid-cols-2 gap-2">
                        <SheetClose>
                          <Button
                            type="submit"
                            onClick={() => callResident()}
                            className="flex flex-row  gap-2 items-end w-full mt-4"
                          >
                            <Phone />
                            Call
                          </Button>
                        </SheetClose>

                        <SheetClose>
                          <Button
                            color="red"
                            className="flex flex-row gap-2 items-end w-full mt-4 bg-red-400 hover:bg-red-500"
                          >
                            <Ban />
                            Cancel
                          </Button>
                        </SheetClose>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </SheetContent>
          </Sheet>

          <Pencil />
        </CardFooter>
      </div>
    </Card>
  )
}

const HomePage = () => {
  const pb = useApplicatonStore(state => state.pb)

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
