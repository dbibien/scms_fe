import { concernType } from "@/common/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import ConcernCardEdit from "./ConcernCardEdit"
import { Trash } from "lucide-react"
import { useLoggedInUserStore } from "@/common/store"

type concernCardType = {
  concern: concernType
}

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
          <Trash className="text-slate-500 hover:text-red-400" />
        </CardFooter>
      ) : ""}

    </Card>
  )
}

export default ConcernCard
