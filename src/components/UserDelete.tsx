import { Trash } from "lucide-react"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { userType } from "@/common/types"

type CProps = {
  user: userType,
  getUsersData: () => Promise<void>,
}

const UserDelete = ({ user, getUsersData }: CProps) => {

  return (
    <Sheet>
      <SheetHeader>
        <SheetTrigger>
          <Trash className="text-slate-500 hover:text-red-400" />
        </SheetTrigger>
      </SheetHeader>

      <SheetContent side="bottom">
        <SheetTitle className="text-center">
          Delete User
        </SheetTitle>

        <div className="text-center space-y-2">
          <p className="text-md">Are you sure you want to delete the user?</p>
          <p className="font-semibold text-lg">{user?.first_name}, {user?.last_name}</p>
          <p className="font-semibold text-lg">{user?.email}</p>
        </div>
      </SheetContent>

      <SheetFooter>

      </SheetFooter>
    </Sheet>
  )
}

export default UserDelete
