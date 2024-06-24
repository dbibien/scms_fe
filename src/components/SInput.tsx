import { Input } from "./ui/input"

type CPropsTypes = {
  type: string,
  name: string,
  placeHolder: string,
  searchValue: string, 
  setSearchValue: React.Dispatch<React.SetStateAction<string>>,
  styles?: string,
  fields?: any,
}

const SInput = ({type, name, placeHolder, searchValue, setSearchValue, styles, fields}: CPropsTypes) => {
  return (
    <div>
      <Input
        type={type}
        name={name}
        placeholder={placeHolder} 
        value={searchValue}
        onChan
        onChange={(e) => setSearchValue(e.target.value)}
        className={styles} {...fields} />
    </div>
  )
}

export default SInput
