// import SInput from "@/components/SInput"
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
import { useApplicationStore, useCommunityStore, useLoggedInUserStore } from "@/common/store"
import { concernType, houseType, phoneType, residentType, selectConcernsType } from "@/common/types"
import SplInput from "@/components/SplInput";
import ConcernSelectorViewer from "@/components/ConcernSelectorViewer";
import Spinner from "@/components/Spinner";

// type houseRecords = {
//   id: string,
//   address: string,
//   member_number: string,
//   security_code: string,
//   image: string,
//   note: string,
//   expand: {
//     phones: {
//       id: string,
//       phone_number: string,
//       primary: boolean,
//       type: "home" | "cell" | "business"
//     }[],
//     residents: {
//       id: string,
//       first_name: string,
//       last_name: string,
//       owner: boolean,
//     }[],
//   },
// }

type homeCardType = {
  house: houseType,
}

// const HomeCard = ({ id, image, address, member_number, security_code, note, expand }: houseRecords) => {
const HomeCard = ({ house }: homeCardType) => {
  const pb = useApplicationStore(state => state.pb)
  const concerns = useCommunityStore(state => state.concerns)
  const loggedInUserCommunityId = useLoggedInUserStore(state => state.user.community_id)
  const setConcerns = useCommunityStore(state => state.setConcerns)

  const [loading, setLoading] = useState(true)
  const [selectConcerns, setSelectConcerns] = useState<selectConcernsType[]>([])
  const [searchValue, setSearchValue] = useState("")

  const getConcerns = async () => {
    setLoading(true)
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
      console.log("e:", e)
    } finally {
      setLoading(false)
    }
  }

  const callResident = async () => {
    const res = await pb.send(`/api/scms/call-resident`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
        "Authorization": `${pb.authStore.token} `,
      },
      body: JSON.stringify(
        {
          h_id: house?.id,
          concerns: selectConcerns
        }
      )
    })


    const data = res.json()
    console.log("data: ", data)
  }

  const handleRemoveConcern = (id: string) => {
    const newSelectedConcernsList = selectConcerns.filter(concern => (concern.id !== id))
    setSelectConcerns(newSelectedConcernsList)
  }

  const handleSearchConcerns = (concern: concernType) => {
    if (searchValue === "") return concern

    if (concern.name.toLowerCase().includes(searchValue.toLowerCase())) return concern
  }

  // console.log("note: ", house?.note)
  // console.log("house: ", house)
  // console.log("selected concerns: ", selectConcerns)
  // console.log("searchValue: ", searchValue)


  return (
    <Card className="mb-8 lg:grid lg:grid-cols-[2fr_2fr_2fr]">
      <CardHeader className="p-0">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/api/files/houses/${house?.id}/${house?.image}`}
          width="100%"
          height="auto"
          className="rounded-t-md object-cover"
        />
      </CardHeader>

      <div>
        <CardContent className="pt-2">
          <p className="text-center">{house?.address}</p>

          <div className="pt-4 flex flex-row justify-center gap-2">
            {house?.residents.map(resident => {
              return (
                <div key={resident.id}>
                  <p>{resident?.first_name} {resident?.last_name}</p>
                  {house?.residents.length > 1 && (
                    <Separator orientation="vertical" className="border border-slate-200" />
                  )}
                </div>
              )
            })}
          </div>

          <div className="pt-4 flex flex-row justify-center gap-2">
            <p>Member: {house?.member_number}</p>
            <Separator orientation="vertical" className="border border-slate-200" />
            <p>Security code: {house?.security_code}</p>
          </div>

          <Separator className="mt-8 border border-slate-200" />
        </CardContent>

        <CardFooter className="flex flex-row justify-between items-center">
          <Sheet>
            <SheetTrigger>
              <button onClick={() => console.log("hello world")}>
                <PhoneCall />
              </button>
            </SheetTrigger>

            <SheetContent side="bottom">
              <SheetHeader>
                <SheetTitle className="text-center">
                  Select concerns
                </SheetTitle>

                <p className="text-center text-gray-600">{house?.address}</p>
                <Separator orientation="horizontal" className="border border-slate-200" />
              </SheetHeader>

              <div className="mt-2 pl-2 pr-2 pb-2 lg:w-[50%] lg:mx-auto">
                <ConcernSelectorViewer
                  selectConcerns={selectConcerns}
                  handleRemoveConcern={handleRemoveConcern}
                />

                <SplInput
                  type="text"
                  name="search"
                  placeHolder="search concerns..."
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  styles="pt-5 pb-5 mb-4 text-lg"
                />

                {loading === true ? (
                  <>
                    <div className="flex justify-center">
                      <Spinner color="black" />
                    </div>
                    <p className="text-center text-slate-400">Loading concerns...</p>
                  </>
                ) : (
                  <ScrollArea className="max-h-80 pl-2 pr-2 bg-slate-50">
                    {
                      concerns.filter(handleSearchConcerns).map(concern => (
                        <div key={concern?.id} className="mt-4">
                          <CheckBox
                            id={concern?.id}
                            name={concern?.name}
                            hint={concern?.hint}
                            checked={
                              selectConcerns.filter(sc => (sc.id === concern.id && sc.selected === true)).length === 1 && true
                            }
                            selectConcerns={selectConcerns}
                            setSelectConcerns={setSelectConcerns}
                          />
                        </div>
                      ))
                    }
                  </ScrollArea>
                )}


                <Sheet>
                  <SheetTrigger
                    disabled={selectConcerns.length === 0}
                    className="w-full"
                  >
                    <Button
                      disabled={selectConcerns.length === 0}
                      className="flex flex-row  gap-2 items-end w-full mt-4"
                    >
                      <Phone />
                      Reach Out To Resident
                    </Button>
                  </SheetTrigger>

                  <SheetContent side="bottom">
                    <div className="lg:w-[50%] lg:mx-auto">
                      <h3 className="text-center text-xl font-bold-[400px]">
                        Are you sure you want to call the resident?
                      </h3>

                      <div className="mt-4">
                        <ConcernSelectorViewer
                          selectConcerns={selectConcerns}
                          handleRemoveConcern={handleRemoveConcern}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <SheetClose
                          disabled={selectConcerns.length === 0}
                        >
                          <Button
                            type="submit"
                            disabled={selectConcerns.length === 0}
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
  const pb = useApplicationStore(state => state.pb)
  const houses = useCommunityStore(state => state.houses)
  const loggedInUserCommunityId = useLoggedInUserStore(state => state.user.community_id)
  // const setConcerns = useCommunityStore(state => state.setConcerns)
  // const setCommunity = useCommunityStore(state => state.setCommunity)
  const setHouses = useCommunityStore(state => state.setHouses)

  // const [houses, setHouses] = useState<houseRecords[]>([])
  const [searchHomeValue, setSearchHomeValue] = useState("")

  const getHomeData = async () => {
    try {
      // fields the backend should return
      // const residentFields = `
      //   expand.houses.expand.residents.id, expand.houses.expand.residents.first_name, expand.houses.expand.residents.last_name, 
      //   expand.houses.expand.residents.owner
      // `
      const houseFields = `id, address, member_number, security_code, image, note`
      // const concernsFields = `
      //   expand.concerns.id, expand.concerns.name, expand.concerns.hint, expand.concerns.say 
      // `

      const phoneFields = `
        expand.phones_via_house.id, expand.phones_via_house.phone_number, expand.phones_via_house.primary, expand.phones_via_house.type
      `
      const residentFields = `
        expand.residents_via_house.id, expand.residents_via_house.first_name, expand.residents_via_house.last_name, expand.residents_via_house.owner,
      `

      // const fields = `${communityFields}, ${concernsFields}, ${houseFields}, ${residentFields}, ${phoneFields}`

      const fields = `${houseFields}, ${phoneFields}, ${residentFields}`
      const records = await pb.collection('houses').getFullList({
        filter: `community.id = '${loggedInUserCommunityId}'`,
        fields: fields,
        expand: 'phones_via_house, residents_via_house',
      })

      const houses = records.map((house) => {
        const phones: phoneType[] = house?.expand?.phones_via_house.map((phone: phoneType) => ({
          id: phone?.id,
          phone_number: phone?.phone_number,
          primary: phone?.primary,
          type: phone?.type,
        }))

        const residents: residentType[] = house?.expand?.residents_via_house?.map((resident: residentType) => ({
          id: resident?.id,
          first_name: resident?.first_name,
          last_name: resident?.last_name,
          owner: resident?.owner,
        }))

        const data: houseType = {
          id: house.id,
          address: house.address,
          image: house.image,
          member_number: house.member_number,
          security_code: house.security_code,
          note: house.note,
          phones: phones || [],
          residents: residents || [],
        }

        return data
      })

      setHouses(houses)
    } catch (e) {
      console.log("e:", e)
    }
  }

  useEffect(() => {
    // getAllHouses()
    // getAllConcerns()
    getHomeData()
  }, [])

  // console.log("house: ", houses)
  // console.log("concerns: ", concerns)

  // <div className="mt-4 p-2 md:max-w-[70%] md:m-auto">
  return (
    <div>
      {/*
      <SInput 
        type="text" 
        name="search"
        searchValue={searchHomeValue}
        setSearchValue={setSearchHomeValue}
        placeHolder="search homes..." 
        styles="pt-5 pb-5 text-lg" 
      />
      */}

      <SplInput
        type="text"
        name="search"
        searchValue={searchHomeValue}
        setSearchValue={setSearchHomeValue}
        placeHolder="search homes..."
        styles="pt-5 pb-5 text-lg"
      />

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
          return <HomeCard
            key={house?.id}
            house={house}
          />
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
