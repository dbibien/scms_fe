import { concernCardType } from "@/common/types"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Ban, Phone, Trash } from "lucide-react"
import ConfirmAction from "./ConfirmAction"
import { Button } from "./ui/button"

const ConcernCardDelete = ({ concern }: concernCardType) => {
  console.log("concern: ", concern)

  return (
    <Sheet>
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
              // disabled={disabled}
              // onClick={() => performAction()}
              className="flex flex-row  gap-2 items-end w-full mt-4"
            >
              <Trash />
              Delete
            </Button>

            <SheetClose>
              <Button
                color="red"
                className="flex flex-row gap-2 items-end w-full mt-4 bg-red-400 hover:bg-red-500"
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


{/*

        <ConfirmAction
          trigger={<Trash />}
          triggerLabel="Delete"
          confirmationMessage="Are you sure you want to delete this concern?"
        />
  */}
