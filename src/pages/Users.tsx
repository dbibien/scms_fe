import { useApplicationStore, useCommunityStore } from "@/common/store"
import { userType } from "@/common/types"
import PageInfoBar from "@/components/PageInfoBar"
import SplInput from "@/components/SplInput"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Pencil } from "lucide-react"
import { useEffect, useState } from "react"

const UserCard = ({ user }: userType) => {
  const [imageError, setImageError] = useState(false)

  return (
    <div>
      <Card className="px-2">
        <CardHeader className="flex flex-row justify-center">
          <img
            // src={imageError ? "src/assets/homeDefault.jpg" : `${import.meta.env.VITE_BACKEND_URL}/api/files/houses/${house?.id}/${house?.image}`}
            src="src/assets/defaultAvatar.png"
            alt="Default user avatar"
            width="50%"
            // height="auto"
            onError={() => setImageError(true)}
            className="object-cover"
          />
        </CardHeader>

        <Separator orientation="horizontal" />

        <CardContent className="text-center space-y-2">
          <p className="font-semibold mt-4">John, Doe</p>
          <p>Director</p>
        </CardContent>

        <Separator orientation="horizontal" />

        <CardFooter>
          <div className="pt-4">
            <Pencil />
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

const UsersPage = () => {
  const pb = useApplicationStore(state => state.pb)
  const communityId = useCommunityStore(state => state.community.id)
  const users = useCommunityStore(state => state.users)
  const setUsers = useCommunityStore(state => state.setUsers)

  const [searchUserValue, setSearchUserValue] = useState("")
  const [filteredUsers, setFilteredUsers] = useState<userType[]>(users)

  const getUsers = async () => {
    try {
      const users: userType[] = await pb.collection("users").getFullList({
        filter: `community.id = "${communityId}"`,
        fields: "id, first_name, last_name, email, type",
      })

      // console.log("users: ", users)
      setUsers(users)
    } catch (e) {
      console.log("e: ", e)
    }
  }


  const filterUsersBySearchedValue = (user: userType) => {
    const searchedValueLowerCase = searchUserValue.toLowerCase()
    if (searchedValueLowerCase === "") {
      return user
    } else if (
      user.first_name.toLowerCase().includes(searchedValueLowerCase) ||
      user.last_name.toLowerCase().includes(searchedValueLowerCase) ||
      user.email.toLowerCase().includes(searchedValueLowerCase) ||
      user.type.toLowerCase().includes(searchedValueLowerCase)
    ) {
      return user
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    setFilteredUsers(users?.filter(filterUsersBySearchedValue))
  }, [searchUserValue])

  return (
    <div>
      <SplInput
        type="text"
        name="search"
        searchValue={searchUserValue}
        setSearchValue={setSearchUserValue}
        placeHolder="Search users..."
        styles="pt-5 pb-5 text-lg"
      />

      {/*
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
      */}


      <ScrollArea className="h-[80vh]">
        <div className="space-y-4 lg:grid lg:grid-cols-4 lg:gap-4 lg:space-y-0">
          {filteredUsers?.map(user => (
            <UserCard user={user} />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

export default UsersPage
