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
import { Info } from 'lucide-react'
// import { Home } from 'lucide-react'
import { useEffect, useState } from "react"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import CheckBox from "@/components/CheckBox"
import { useApplicationStore, useCommunityStore, useLoggedInUserStore } from "@/common/store"
import { concernType, houseType, phoneType, residentType, selectConcernsType } from "@/common/types"
import SplInput from "@/components/SplInput"
import ConcernSelectorViewer from "@/components/ConcernSelectorViewer"
import Spinner from "@/components/Spinner"
import { toast } from "@/components/ui/use-toast"
import PageInfoBar from "@/components/PageInfoBar"
import HomeCreate from "@/components/HomeCreate"
import HomeUpdate from "@/components/HomeUpdate"
import HomeAddress from "@/components/HomeAddress";

type homeCardType = {
  house: houseType,
  getHomeData: () => Promise<void>,
}

const HouseNote = ({ note }: { note: string }) => {
  const [showFullNote, setShowFullNote] = useState(false)

  const noteClean = note.replace("<p>", "").replace("</p>", "")

  return (
    <div className="">
      <p className="text-sm underline text-slate-500">Note:</p>
      <div>
        <p>{showFullNote ? noteClean : noteClean.length > 30 ? `${noteClean.slice(0, 30)}... ` : noteClean}
          {noteClean.length > 30 && (
            <button
              onClick={() => setShowFullNote(!showFullNote)}
              className="pl-1 text-blue-300"
            >
              {showFullNote ? `show less` : `show more`}
            </button>
          )}
        </p>
      </div>
    </div>
  )
}

const HomeCard = ({ house, getHomeData }: homeCardType) => {
  const pb = useApplicationStore(state => state.pb)
  const concerns = useCommunityStore(state => state.concerns)
  const loggedInUserCommunityId = useLoggedInUserStore(state => state.user.community_id)
  const setConcerns = useCommunityStore(state => state.setConcerns)

  const [loading, setLoading] = useState(true)
  const [selectConcerns, setSelectConcerns] = useState<selectConcernsType[]>([])
  const [searchValue, setSearchValue] = useState("")
  const [imageError, setImageError] = useState(false)

  const getConcerns = async () => {
    // NOTE: duplicated code. Good use for a custom hook
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
      toast({
        variant: "destructive",
        title: "Fail",
        description: "Fail to retrieve concerns"
      })
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
      <CardHeader className="p-0 bg-black flex flex-row items-center">
        <img
          src={imageError ? "src/assets/homeDefault.jpg" : `${import.meta.env.VITE_BACKEND_URL}/api/files/houses/${house?.id}/${house?.image}`}
          width="100%"
          height="auto"
          onError={() => setImageError(true)}
          className="object-cover"
        />
      </CardHeader>

      <div>
        <CardContent className="pt-2">
          <HomeAddress house={house} />

          <div className="pt-2 flex flex-row justify-center gap-2">
            {house?.residents.map((resident, index) => {
              return (
                <div key={resident.id} className="flex flex-row gap-2">
                  <p>{resident?.first_name} {resident?.last_name}</p>
                  {index + 1 !== house?.residents.length && (
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

          {house?.note && (<>
            <Separator className="mt-6 border border-slate-200" />
            <div className="mt-4">
              <HouseNote note={house?.note} />
            </div>
          </>)
          }
        </CardContent>
      </div>

      <CardFooter className="flex flex-row justify-between items-center border-t pt-6 lg:border-l lg:border-l-slate-200 lg:items-end lg:pt-4 lg:border-t-0">
        <Sheet>
          <SheetTrigger>
            <button onClick={getConcerns}>
              <PhoneCall />
            </button>
          </SheetTrigger>

          <SheetContent side="bottom">
            <SheetHeader>
              <SheetTitle className="text-center">
                Select concerns
              </SheetTitle>

              <p className="text-center">{`${house?.address} ${house?.apt}, ${house?.city} ${house?.state}, ${house?.zip}`}</p>
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
                placeHolder="Search concerns..."
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                styles="text-lg"
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

        <HomeUpdate house={house} getHomeData={getHomeData} />
      </CardFooter>
    </Card>
  )
}

const HomePage = () => {
  const pb = useApplicationStore(state => state.pb)
  const houses = useCommunityStore(state => state.houses)
  const loggedInUserCommunityId = useLoggedInUserStore(state => state.user.community_id)
  const setHouses = useCommunityStore(state => state.setHouses)

  const [searchHomeValue, setSearchHomeValue] = useState("")
  const [filteredHouses, setFilteredHouses] = useState<houseType[]>(houses)
  const [openHomeCreationCard, setOpenHomeCreationCard] = useState(false)

  const getHomeData = async () => {
    try {
      // fields the backend should return
      const houseFields = `id, address, apt, city, state, zip, member_number, security_code, image, note`
      const phoneFields = `
        expand.phones_via_house.id, expand.phones_via_house.phone_number, expand.phones_via_house.primary, expand.phones_via_house.type
      `
      const residentFields = `
        expand.residents_via_house.id, expand.residents_via_house.first_name, expand.residents_via_house.last_name, expand.residents_via_house.owner,
      `
      const fields = `${houseFields}, ${phoneFields}, ${residentFields}`
      const records = await pb.collection('houses').getFullList({
        filter: `community.id = '${loggedInUserCommunityId}'`,
        fields: fields,
        expand: 'phones_via_house, residents_via_house',
      })

      const houses = records.map((house) => {
        const phones: phoneType[] = house?.expand?.phones_via_house?.map((phone: phoneType) => ({
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
          id: house?.id,
          address: house?.address,
          apt: house?.apt,
          city: house?.city,
          state: house?.state,
          zip: house?.zip,
          image: house?.image,
          member_number: house?.member_number,
          security_code: house?.security_code,
          note: house?.note,
          phones: phones || [],
          residents: residents || [],
        }

        return data
      })

      // console.log("houses: ", houses)

      setHouses(houses)
      setFilteredHouses(houses)
    } catch (e) {
      console.log("e:", e)
    }
  }

  const filterHousesBySearchedValue = (house: houseType) => {
    const searchedValueLowerCase = searchHomeValue.toLowerCase()
    if (searchedValueLowerCase === "") {
      return house
    } else if (
      house.address.toLowerCase().includes(searchedValueLowerCase) ||
      house.apt.toLowerCase().includes(searchedValueLowerCase) ||
      house.city.toLowerCase().includes(searchedValueLowerCase) ||
      house.state.toLowerCase().includes(searchedValueLowerCase) ||
      house.zip.toLowerCase().includes(searchedValueLowerCase) ||
      house.security_code.toLowerCase().includes(searchedValueLowerCase) ||
      house.member_number.toLowerCase().includes(searchedValueLowerCase)
    ) {
      return house
    }
  }

  useEffect(() => {
    getHomeData()
  }, [])

  useEffect(() => {
    setFilteredHouses(houses.filter(filterHousesBySearchedValue))
  }, [searchHomeValue])

  // console.log("house: ", houses)
  // console.log("concerns: ", concerns)

  return (
    <div>
      <SplInput
        type="text"
        name="search"
        searchValue={searchHomeValue}
        setSearchValue={setSearchHomeValue}
        placeHolder="Search homes..."
        styles="pt-5 pb-5 text-lg"
      />

      <PageInfoBar
        resultLength={filteredHouses.length}
        resultType=" home(s)"
        component={<HomeCreate
          openHomeCreationCard={openHomeCreationCard}
          setOpenHomeCreationCard={setOpenHomeCreationCard}
          showCreationButton={filteredHouses.length > 0 && true}
          getHomeData={getHomeData}
        />}
      />

      {filteredHouses.length < 1 && (
        <>
          <div className="bg-amber-100 md:max-w-[50%] m-auto mt-4 p-4 rounded-md">
            <Info color="orange" />
            <p className="text-center">No homes found</p>
          </div>

          <div className="mt-4 flex flex-row justify-center">
            <HomeCreate
              openHomeCreationCard={openHomeCreationCard}
              setOpenHomeCreationCard={setOpenHomeCreationCard}
              getHomeData={getHomeData}
            />
          </div>
        </>
      )}

      <div className="mt-4 pb-40 h-[100vh] overflow-hidden overflow-y-auto">
        {filteredHouses?.map((house: houseType) => {
          return <HomeCard
            key={house?.id}
            house={house}
            getHomeData={getHomeData}
          />
        })}
      </div>
    </div>
  )
}

export default HomePage
