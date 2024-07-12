import { Input } from "./ui/input"

type CPropsTypes = {
  type: string,
  name: string,
  placeHolder: string,
  helperText?: string,
  max?: number,
  // searchValue: string,
  // setSearchValue: React.Dispatch<React.SetStateAction<string>>,
  styles?: string,
  fields: any,
}

const SInput = ({ type, name, placeHolder, helperText = "", max = undefined, styles, fields }: CPropsTypes) => {
  return (
    <div>
      <Input
        type={type}
        name={name}
        placeholder={placeHolder}
        maxLength={max}
        // value={searchValue}
        className={`${styles}`} {...fields} />
      <p className="text-sm text-muted-foreground mt-1">{helperText}</p>
    </div>
  )
}

export default SInput
