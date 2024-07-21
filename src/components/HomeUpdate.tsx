import { Pencil } from "lucide-react"
import { Button } from "./ui/button"
import { Sheet, SheetTrigger } from "./ui/sheet"
import { useState } from "react"

type CProps = {
  openHomeUpdateCard: boolean,
  setOpenHomeUpdateCard: React.Dispatch<React.SetStateAction<boolean>>,
  showCreationButton?: boolean,
  buttonFull?: boolean,
  getHomeData: () => Promise<void>,
}

const HomeUpdate = () => {
  const [openHomeUpdateCard, setOpenHomeUpdateCard] = useState(false)

  return (
    <Sheet open={openHomeUpdateCard} onOpenChange={setOpenHomeUpdateCard} >
      <SheetTrigger>
        <Pencil />
      </SheetTrigger>
    </Sheet>
  )
}

export default HomeUpdate
