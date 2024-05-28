import { Link } from "react-router-dom"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"

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


const NavListItem = ({ to, title }: { to: string, title: string }) => {
  return (
    <li className="text-white">
      <Link to={to}>{title}</Link>
    </li>
  )
}

const AppNavLinks = ({ mobile = true }) => {
  const mobileStyles = ""
  const deskTopStyles = "flex flex-row gap-4"

  return (
    <ul className={mobile ? mobileStyles : deskTopStyles}>
      <NavListItem to="/home" title="Home" />
      <NavListItem to="/users" title="Users" />
      <NavListItem to="/concerns" title="Concerns" />
      <NavListItem to="/reports" title="Reports" />
    </ul>
  )
}


const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu color="#fff" />
      </SheetTrigger>

      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>

        <AppNavLinks mobile={true} />
      </SheetContent>
    </Sheet>
  )
}
