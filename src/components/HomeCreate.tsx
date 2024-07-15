import { Home } from "lucide-react"
import { Sheet, SheetTrigger } from "./ui/sheet"

type CProps = {
  openHomeCreationCard: boolean,
  setOpenHomeCreationCard: React.Dispatch<React.SetStateAction<boolean>>,
}

const HomeCreate = ({ openHomeCreationCard, setOpenHomeCreationCard }: CProps) => {
  return (
    <div>
      <Sheet open={openHomeCreationCard} onOpenChange={setOpenHomeCreationCard} >
        <SheetTrigger>
          <Home />
          Add New Home
        </SheetTrigger>

      </Sheet>
    </div>
  )
}

export default HomeCreate
