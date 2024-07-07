import { concernCardType } from "@/common/types"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Ban, Trash } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"
import { useApplicationStore, useCommunityStore } from "@/common/store"
import { toast } from "./ui/use-toast"
import Spinner from "./Spinner"

const ConcernCardDelete = ({ concern }: concernCardType) => {
  const pb = useApplicationStore(state => state.pb)
  const setDeleteConcern = useCommunityStore(state => state.setDeleteConcern)

  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const deleteConcern = async () => {
    setLoading(true)
    try {
      await pb.collection("concerns").delete(concern?.id)
      toast({
        variant: "default",
        title: "Success",
        description: "Concern deleted"
      })
      setDeleteConcern(concern?.id)
      setOpen(false)
    } catch (e) {
      console.log("e: ", e)
      toast({
        variant: "destructive",
        title: "Fail",
        description: "Concern not deleted"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetHeader>
        <SheetTrigger>
          <Trash className="text-slate-500 hover:text-red-400" />
        </SheetTrigger>
      </SheetHeader>

      <SheetContent side="bottom" className="text-center">
        <SheetTitle className="mb-2">
          {concern?.name}
        </SheetTitle>

        <div className="lg:w-[50%] lg:mx-auto">
          <h3 className="text-center text-xl font-bold-[400px]">
            Are you are sure you want to delete this concern?
          </h3>


          <div className="grid grid-cols-2 gap-2">
            <Button
              type="submit"
              disabled={loading}
              onClick={() => deleteConcern()}
              className="flex flex-row  gap-2 items-end w-full mt-4"
            >
              <Trash />
              {loading ? <Spinner /> : "Delete"}
            </Button>

            <SheetClose disabled={loading}>
              <Button
                color="red"
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

export default ConcernCardDelete
