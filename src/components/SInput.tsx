import { Input } from "./ui/input"

type CPropsTypes = {
  type: string,
  name: string,
  placeHolder: string,
  // searchValue: string,
  // setSearchValue: React.Dispatch<React.SetStateAction<string>>,
  styles?: string,
  fields: any,
}

const SInput = ({ type, name, placeHolder, styles, fields }: CPropsTypes) => {
  return (
    <div>
      <Input
        type={type}
        name={name}
        placeholder={placeHolder}
        // value={searchValue}
        className={`mb-4 ${styles}`} {...fields} />
    </div>
  )
}

export default SInput
