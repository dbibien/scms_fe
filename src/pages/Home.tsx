// import SInput from "@/components/SInput"
// import { Info } from 'lucide-react'
// import { Home } from 'lucide-react'
import { useEffect, useState } from "react"
import { useApplicationStore, useCommunityStore, useLoggedInUserStore } from "@/common/store"
import { houseType, phoneType, residentType } from "@/common/types"
import SplInput from "@/components/SplInput"
import { toast } from "@/components/ui/use-toast"
import PageInfoBar from "@/components/PageInfoBar"
import HomeCreate from "@/components/HomeCreate"
import HomeCard from "@/components/HomeCard";
import NoResultFound from '@/components/NoResultsFound'

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
      const houseFields = `id, address, apt, city, state, zip, member_number, security_code, pending_call_concerns_ids, image, note, house_check, house_check_start_date, house_check_end_date, house_check_last_date`
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
          pending_call_concerns_ids: house?.pending_call_concerns_ids,
          note: house?.note,
          house_check: house?.house_check,
          house_check_start_date: house?.house_check_start_date,
          house_check_end_date: house?.house_check_end_date,
          house_check_last_date: house?.house_check_last_date,
          phones: phones || [],
          residents: residents || [],
        }

        return data
      })

      // console.log("houses: ", houses)

      setHouses(houses)
      setFilteredHouses(houses)
    } catch (e) {
      // console.log("e:", e)
      // @ts-expect-error fix types later  
      const errData = e?.data
      if (errData?.code === 400) {
        toast({
          variant: "destructive",
          title: "Fail",
          description: errData?.message,
        })
      }
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
          <NoResultFound message='No homes found' />

          <div className="mt-4 flex flex-row justify-center">
            <HomeCreate
              openHomeCreationCard={openHomeCreationCard}
              setOpenHomeCreationCard={setOpenHomeCreationCard}
              getHomeData={getHomeData}
            />
          </div>
        </>
      )}

      <div className="mt-4 h-[73vh] overflow-hidden overflow-y-auto">
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
