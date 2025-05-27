import { useEffect, useState } from "react"
import { useLoggedInUserStore } from "@/common/store"
import { houseType } from "@/common/types"
import SplInput from "@/components/SplInput"
import PageInfoBar from "@/components/PageInfoBar"
import HomeCreate from "@/components/HomeCreate"
import HomeCard from "@/components/HomeCard";
import NoResultFound from '@/components/NoResultsFound'
import useGetHomes from "@/hooks/useGetHomes"
import { toast } from "@/components/ui/use-toast"
import Spinner from "@/components/Spinner"

const HomePage = () => {
  const loggedInUserCommunityId = useLoggedInUserStore(state => state.user.community_id)

  const { houses, isLoading, error, getHomeData } = useGetHomes(loggedInUserCommunityId)

  const [filteredHouses, setFilteredHouses] = useState<houseType[]>(() => houses)
  const [searchHomeValue, setSearchHomeValue] = useState("")
  const [openHomeCreationCard, setOpenHomeCreationCard] = useState(false)

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
    setFilteredHouses(houses.filter(filterHousesBySearchedValue))
  }, [searchHomeValue, houses])


  if (error) {
    toast({
      variant: "destructive",
      title: "Fail",
      description: error?.message,
    })
  }

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
        {isLoading && (
          <div className="flex justify-center">
            <Spinner color="black" />
          </div>

        )}

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
