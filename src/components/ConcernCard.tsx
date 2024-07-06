import { concernCardType } from "@/common/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import ConcernCardEdit from "./ConcernCardEdit"
import { useLoggedInUserStore } from "@/common/store"
import ConcernCardDelete from "./ConcernCardDelete"


const ConcernCard = ({ concern }: concernCardType) => {
  const loggedInUserType = useLoggedInUserStore(state => state.user.type)

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{concern?.name}</CardTitle>
        <CardDescription>{concern?.hint}</CardDescription>
      </CardHeader>

      <CardContent>
        <p>{concern?.say.replace("<p>", "").replace("</p>", "")}</p>
      </CardContent>

      {loggedInUserType === "director" ? (
        <CardFooter className="flex gap-6">
          <ConcernCardEdit concern={concern} />
          <ConcernCardDelete concern={concern} />
        </CardFooter>
      ) : ""}
    </Card>
  )
}

export default ConcernCard
