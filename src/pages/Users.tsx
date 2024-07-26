import { useApplicationStore, useCommunityStore } from "@/common/store"
import { userType } from "@/common/types"
import PageInfoBar from "@/components/PageInfoBar"
import SplInput from "@/components/SplInput"
import UserCard from "@/components/UserCard"
import UserCreate from "@/components/UserCreate"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/components/ui/use-toast"
import { Info } from "lucide-react"
import { useEffect, useState } from "react"


const UsersPage = () => {
  const pb = useApplicationStore(state => state.pb)
  const communityId = useCommunityStore(state => state.community.id)
  const users = useCommunityStore(state => state.users)
  const setUsers = useCommunityStore(state => state.setUsers)

  const [searchUserValue, setSearchUserValue] = useState("")
  const [filteredUsers, setFilteredUsers] = useState<userType[]>(users)
  const [openUserCreationCard, setOpenUserCreationCard] = useState(false)

  const getUsersData = async () => {
    try {
      const users: userType[] = await pb.collection("users").getFullList({
        filter: `community.id = "${communityId}"`,
        fields: "id, first_name, last_name, email, type",
      })
      // console.log("users: ", users)
      setUsers(users)
    } catch (e) {
      // console.log("e: ", e)
      // console.log("e.data: ", e?.data)

      // @ts-expect-error fix types later
      const errData = e?.data
      let errMessage = "An error occured while retrieving users"
      if (errData?.code === 404) {
        errMessage = errData?.message
        toast({
          variant: "destructive",
          title: "Failure",
          description: errMessage,
        })
      }
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
    getUsersData()
  }, [])

  useEffect(() => {
    setFilteredUsers(users?.filter(filterUsersBySearchedValue))
  }, [searchUserValue, users])

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

      <PageInfoBar
        resultLength={filteredUsers.length}
        resultType=" users(s)"
        component={<UserCreate
          openUserCreationCard={openUserCreationCard}
          setOpenUserCreationCard={setOpenUserCreationCard}
          getUsersData={getUsersData}
        />}
      />

      {filteredUsers.length < 1 && (
        <>
          <div className="bg-amber-100 md:max-w-[50%] m-auto mt-4 p-4 rounded-md">
            <Info color="orange" />
            <p className="text-center">No users found</p>
          </div>
        </>
      )}

      <ScrollArea className="h-[80vh]">
        <div className="space-y-4 mt-4 lg:grid lg:grid-cols-4 lg:gap-4 lg:space-y-0">
          {filteredUsers?.map(user => (
            <UserCard key={user?.id} user={user} getUsersData={getUsersData} />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

export default UsersPage
