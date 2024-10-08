import { userType } from "@/common/types"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { Separator } from "./ui/separator"
import UserEdit from "./UserEdit"
import UserDelete from "./UserDelete"
import { useLoggedInUserStore } from "@/common/store"

type CProps = {
  user: userType,
  getUsersData: () => Promise<void>
}

const UserCard = ({ user, getUsersData }: CProps) => {
  // const [imageError, setImageError] = useState(false)
  const loggedInUserType = useLoggedInUserStore(state => state.user.type)

  return (
    <div>
      <Card className="px-2">
        <CardHeader className="flex flex-row justify-center">
          <img
            // src={imageError ? "src/assets/homeDefault.jpg" : `${import.meta.env.VITE_BACKEND_URL}/api/files/houses/${house?.id}/${house?.image}`}
            src="/assets/defaultAvatar.png"
            alt="Default user avatar"
            width="30%"
            // height="auto"
            // onError={() => setImageError(true)}
            className="object-cover"
          />
        </CardHeader>

        <Separator orientation="horizontal" />

        <CardContent className="text-center space-y-2">
          <p className="font-semibold mt-4">{`${user?.first_name}, ${user?.last_name}`}</p>
          <p>{user?.type}</p>
          <p>{user.email}</p>
        </CardContent>

        {loggedInUserType === "director" && (
          <>
            <Separator orientation="horizontal" />

            <CardFooter className="pt-4 flex justify-between">
              <UserEdit user={user} getUsersData={getUsersData} />
              <UserDelete user={user} getUsersData={getUsersData} />
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  )
}

export default UserCard
