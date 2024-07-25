import PageInfoBar from "@/components/PageInfoBar"
import SplInput from "@/components/SplInput"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Pencil } from "lucide-react"
import { useState } from "react"

const UserCard = () => {
  const [imageError, setImageError] = useState(false)

  return (
    <div>
      <Card className="">
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

        <CardContent className="text-center space-y-2">
          <p className="font-semibold">John, Doe</p>
          <p>Director</p>

          <div className="pt-4">
            <Pencil />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const UsersPage = () => {
  const [searchUserValue, setSearchUserValue] = useState("")

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

      <div className="lg:grid lg:grid-cols-4 lg:gap-4">
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
    </div>
  )
}

export default UsersPage
