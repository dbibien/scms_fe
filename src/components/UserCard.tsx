import { userType } from "@/common/types"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { Separator } from "./ui/separator"
import { Pencil } from "lucide-react"

type CProps = {
  user: userType,
}

const UserCard = ({ user }: CProps) => {
  // const [imageError, setImageError] = useState(false)

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

export default UserCard
