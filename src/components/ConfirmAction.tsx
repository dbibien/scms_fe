import { Ban, Phone } from "lucide-react"
import { Button } from "./ui/button"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet"

type CProps = {
  disabled?: boolean,
  trigger: any,
  triggerLabel: string,
  confirmationMessage: string,
  performAction: () => void,
}

const ConfirmAction = ({ disabled, trigger, triggerLabel, confirmationMessage, performAction }: CProps) => {
  return (
    <Sheet>

      <SheetContent side="bottom">
        <div className="lg:w-[50%] lg:mx-auto">
          <h3 className="text-center text-xl font-bold-[400px]">
            {confirmationMessage}
          </h3>


          <div className="grid grid-cols-2 gap-2">
            <SheetClose
              disabled={disabled}
            >
              <Button
                type="submit"
                disabled={disabled}
                onClick={() => performAction()}
                className="flex flex-row  gap-2 items-end w-full mt-4"
              >
                <Phone />
                Call
              </Button>
            </SheetClose>

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

export default ConfirmAction
