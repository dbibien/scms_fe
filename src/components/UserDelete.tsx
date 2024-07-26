import { Ban, Trash } from "lucide-react"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { userType } from "@/common/types"
import { Button } from "./ui/button"
import { useState } from "react"
import Spinner from "./Spinner"
import { toast } from "./ui/use-toast"
import { useApplicationStore } from "@/common/store"

type CProps = {
  user: userType,
  getUsersData: () => Promise<void>,
}

const UserDelete = ({ user, getUsersData }: CProps) => {
  const pb = useApplicationStore(state => state.pb)

  const [loading, setLoading] = useState(false)
  const [openSheet, setOpenSheet] = useState(false)

  const deleteUser = async () => {
    setLoading(true)
    try {
      await pb.collection("users").delete(user?.id)
      toast({
        variant: "default",
        title: "Success",
        description: "User deleted"
      })
      // setDeleteConcern(concern?.id)
      await getUsersData()
      setOpenSheet(false)
    } catch (e) {
      // console.log("e.data: ", e?.data)

      // @ts-expect-error fix later
      const errData = e?.data
      if (errData?.code === 404) {
        toast({
          variant: "destructive",
          title: "Fail",
          description: errData?.message,
        })
      } else if (errData?.code === 400 || errData?.code === 204) {
        toast({
          variant: "destructive",
          title: "Fail",
          description: "Failed to delete user",
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetHeader>
        <SheetTrigger>
          <Trash className="text-slate-500 hover:text-red-400" />
        </SheetTrigger>
      </SheetHeader>

      <SheetContent side="bottom">
        <SheetTitle className="text-center">
          Delete User
        </SheetTitle>

        <div className="text-center space-y-2 lg:w-[50%] m-auto">
          <p className="text-md">Are you sure you want to delete the user?</p>
          <p className="font-semibold text-lg">{user?.first_name}, {user?.last_name}</p>
          <p className="font-semibold text-lg">{user?.email}</p>

          <div className="grid grid-cols-2 gap-2">
            <Button
              type="submit"
              disabled={loading}
              onClick={() => deleteUser()}
              // className="flex flex-row gap-2 items-end mt-4"
              className="flex flex-row  gap-2 items-end w-full mt-4"
            >
              <Trash />
              {loading ? <Spinner /> : "Delete"}
            </Button>

            <SheetClose disabled={loading}>
              <Button
                color="red"
                // className={`flex flex-row gap-2 items-end mt-4 bg-red-400 ${!loading ? "hover:bg-red-500" : "hover:bg-red-400"}`}
                className={`flex flex-row gap-2 items-end w-full mt-4 bg-red-400 ${!loading ? "hover:bg-red-500" : "hover:bg-red-400"}`}
              >
                <Ban />
                Cancel
              </Button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default UserDelete
