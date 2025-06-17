import { Link, useNavigate, useLocation } from "react-router-dom"
import {
  Sheet,
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
      // console.log(e?.data)
      // @ts-expect-error fix types later
      const errData = e?.data
      if (errData?.code === 404) {
        toast({
          variant: "destructive",
          title: "Fail",
          description: errData?.message,
        })
      }
    }
  }

  const logOut = () => {
    pb.authStore.clear()

    console.log("loging out...")
    return navigate("/")
  }

  useEffect(() => {
    getCommunityData()
  }, [])

  return (
    <nav className="sticky top-0 z-40 px-4 bg-black flex items-center justify-between">
      <div>
        <h1 className="text-white font-bold">SCMS</h1>
      </div>

      <div className="flex flex-row gap-2">
        <div className="hidden lg:block lg:flex lg:gap-4">
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


const NavListItem = ({ to, title, mobile = true, setOpen }: { to: string, title: string, mobile: boolean, setOpen?: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const location = useLocation()

  const mobileStyles = "pt-4 pb-4 text-black text-center"
  const deskTopStyles = `flex items-center text-white px-4 hover:cursor-pointer hover:text-black hover:bg-white 
                          ${location.pathname === "/" && title.toLowerCase() === "homes" ? "text-black bg-white" :
      location.pathname.toLowerCase() === `/${title.toLowerCase()}` ? "text-black bg-white" : ""}`

  const handleSetOpen = () => {
    if (mobile) {
      // @ts-expect-error it's available where it'll be needed. Look into this later
      setOpen(false)
    }
  }

  return (
    <>
      <li className={mobile ? mobileStyles : deskTopStyles} >
        <button
          className={`w-full ${location.pathname === "/" && title.toLowerCase() === "homes" ? "text-black" :
            location.pathname.toLowerCase() === `/${title.toLowerCase()}` ? "text-black" : ""}`}
          onClick={handleSetOpen}
        >
          <Link to={to}>
            {title}
          </Link>
        </button>
      </li>

      {mobile && <Separator orientation="horizontal" className="border border-slate-50" />}
    </>
  )
}

const AppNavLinks = ({ mobile = true, setOpen }: { mobile: boolean, setOpen?: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const mobileStyles = ""
  const deskTopStyles = "flex flex-row gap-4"

  return (
    <ul className={mobile ? mobileStyles : deskTopStyles}>
      <NavListItem to="/" title="Homes" mobile={mobile} setOpen={setOpen} />
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
