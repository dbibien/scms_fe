import { Link, useNavigate } from "react-router-dom"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Separator } from "@radix-ui/react-separator"
import { Button } from "./ui/button"
import { useApplicatonStore } from "@/common/store"

const Nav = () => {
  const pb = useApplicatonStore(state => state.pb)

  const navigate = useNavigate()

  const logOut = () => {
    pb.authStore.clear()

    console.log("loging out...")
    return navigate("/login")
  }

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


const NavListItem = ({ to, title, mobile = true }: { to: string, title: string, mobile: boolean }) => {
  const mobileStyles = "pt-4 pb-4 text-black text-center"
  const deskTopStyles = "text-white"

  return (
    <>
      <li className={mobile ? mobileStyles : deskTopStyles} >
        <Link to={to}>{title}</Link>
      </li>

      {mobile && <Separator orientation="horizontal" className="border border-slate-50" />}
    </>
  )
}

const AppNavLinks = ({ mobile = true }: { mobile: boolean }) => {
  const mobileStyles = ""
  const deskTopStyles = "flex flex-row gap-4"

  return (
    <ul className={mobile ? mobileStyles : deskTopStyles}>
      <NavListItem to="/" title="Home" mobile={mobile} />
      <NavListItem to="/users" title="Users" mobile={mobile} />
      <NavListItem to="/concerns" title="Concerns" mobile={mobile} />
      <NavListItem to="/reports" title="Reports" mobile={mobile} />
    </ul>
  )
}

const MobileNav = ({ logOut }: { logOut: () => void }) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu color="#fff" />
      </SheetTrigger>

      <SheetContent side="right">
        <div>
          <AppNavLinks mobile={true} />
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
