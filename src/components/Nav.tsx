import { Link } from "react-router-dom"
import {
  Sheet,
  SheetContent,
  // SheetDescription,
  // SheetHeader,
  // SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Separator } from "@radix-ui/react-separator"

const Nav = () => {
  return (
    <nav className="bg-black flex items-center p-4 justify-between">
      <div>
        <h1 className="text-white">SCMS</h1>
      </div>

      <div className="flex flex-row gap-2">
        <div className="hidden lg:block">
          <AppNavLinks mobile={false} />
        </div>

        <div className="lg:hidden">
          <MobileNav />
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


      {mobile && <Separator orientation="horizontal" className="border border-slate-50"/> }
    </>
  )
}

const AppNavLinks = ({ mobile = true }) => {
  const mobileStyles = ""
  const deskTopStyles = "flex flex-row gap-4"

  return (
    <ul className={mobile ? mobileStyles : deskTopStyles}>
      <NavListItem to="/home" title="Home" mobile={mobile} />
      <NavListItem to="/users" title="Users" mobile={mobile} />
      <NavListItem to="/concerns" title="Concerns" mobile={mobile} />
      <NavListItem to="/reports" title="Reports" mobile={mobile} />
    </ul>
  )
}

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu color="#fff" />
      </SheetTrigger>

      <SheetContent side="right">
        <div>
          <AppNavLinks mobile={true} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
