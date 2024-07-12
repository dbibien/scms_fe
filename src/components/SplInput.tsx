// import { Input } from "src/components/ui/input"
import { Search } from "lucide-react"
import { Input } from "./ui/input.tsx"

type CPropsTypes = {
  type: string,
  name: string,
  placeHolder: string,
  searchValue: string,
  setSearchValue: React.Dispatch<React.SetStateAction<string>>,
  styles?: string,
  // fields?: any,
}

const SplInput = ({ type, name, placeHolder, searchValue, setSearchValue, styles }: CPropsTypes) => {
  return (
    <div className="flex items-center border rounded-md pl-2">
      <Search />
      <Input
        type={type}
        name={name}
        placeholder={placeHolder}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className={`border-none outline-0 outline-none focus-visible:outline-none focus-visible:outline-0 focus-visible:ring-0 focus-visible:border-none ring-offset-0 focus-visible:ring-offset-0 ring-0 ${styles}`}
      />
    </div>
  )
}

export default SplInput
