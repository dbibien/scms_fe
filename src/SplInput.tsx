import { Input } from "../src/components/ui/input"

type CPropsTypes = {
  type: string,
  name: string,
  placeHolder: string,
  searchValue: string, 
  setSearchValue: React.Dispatch<React.SetStateAction<string>>,
  styles?: string,
  // fields?: any,
}

const SplInput = ({type, name, placeHolder, searchValue, setSearchValue, styles}: CPropsTypes) => {
  return (
    <div>
      <Input
        type={type}
        name={name}
        placeholder={placeHolder} 
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className={styles}
      />
    </div>
  )
}

export default SplInput
