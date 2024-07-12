import { Link, useNavigate } from "react-router-dom"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Separator } from "@radix-ui/react-separator"
import { Button } from "./ui/button"
import { useApplicationStore, useCommunityStore, useLoggedInUserStore } from "@/common/store"
import { useEffect, useState } from "react"
import { toast } from "./ui/use-toast"

const Nav = () => {
  const pb = useApplicationStore(state => state.pb)
  const loggedInUserCommunityId = useLoggedInUserStore(state => state.user.community_id)
  const setCommunity = useCommunityStore(state => state.setCommunity)

  const navigate = useNavigate()

  const getCommunityData = async () => {
    try {
      const record = await pb.collection('communities').getOne(loggedInUserCommunityId, {
        fields: "id, name, address",
      })
      // console.log("record from nav: ", record)
      setCommunity({
        id: record?.id,
        name: record?.name,
        address: record?.address,
      })
    } catch (e) {
      console.log(e)
      toast({
        variant: "destructive",
        title: "Fail",
        description: "Community data not loaded",
      })
    }
  }

  const logOut = () => {
    pb.authStore.clear()

    console.log("loging out...")
    return navigate("/login")
  }

  useEffect(() => {
    getCommunityData()
  }, [])

  return (
    <nav className="sticky top-0 z-40 bg-black flex items-center p-4 justify-between">
      <div>
        <h1 className="text-white">SCMS</h1>
      </div>

      <div className="flex flex-row gap-2">
        <div className="hidden lg:block lg:flex lg:items-center lg:gap-4">
          <AppNavLinks mobile={false} />
          <Button onClick={logOut}>Log out</Button>
        </div>

        <div className="lg:hidden">
          <MobileNav logOut={logOut} />
        </div>
      </div>
    </nav>
  )
}

export default Nav


const NavListItem = ({ to, title, mobile = true, setOpen }: { to: string, title: string, mobile: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const mobileStyles = "pt-4 pb-4 text-black text-center"
  const deskTopStyles = "text-white"

  const handleSetOpen = () => {
    if (mobile) {
      setOpen(false)
    }
  }

  return (
    <>
      <li className={mobile ? mobileStyles : deskTopStyles} >
        <button
          className="w-full hover:cursor-pointer"
          onClick={handleSetOpen}
        >
          <Link
            to={to}
          >
            {title}
          </Link>
        </button>
      </li>

      {mobile && <Separator orientation="horizontal" className="border border-slate-50" />}
    </>
  )
}

const AppNavLinks = ({ mobile = true, setOpen }: { mobile: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const mobileStyles = ""
  const deskTopStyles = "flex flex-row gap-4"

  return (
    <ul className={mobile ? mobileStyles : deskTopStyles}>
      <NavListItem to="/" title="Home" mobile={mobile} setOpen={setOpen} />
      <NavListItem to="/users" title="Users" mobile={mobile} setOpen={setOpen} />
      <NavListItem to="/concerns" title="Concerns" mobile={mobile} setOpen={setOpen} />
      <NavListItem to="/reports" title="Reports" mobile={mobile} setOpen={setOpen} />
    </ul>
  )
}

const MobileNav = ({ logOut }: { logOut: () => void }) => {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Menu color="#fff" />
      </SheetTrigger>

      <SheetContent side="right">
        <div>
          <AppNavLinks mobile={true} setOpen={setOpen} />
        </div>

        <div>
          <Button
            type="button"
            className="w-full mt-4"
            onClick={logOut}
          >
            Log out
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
