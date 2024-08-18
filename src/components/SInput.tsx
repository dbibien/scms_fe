import { Input } from "./ui/input"

type CPropsTypes = {
  type: string,
  name: string,
  placeHolder: string,
  helperText?: string,
  min?: number,
  max?: number,
  maxCharacters?: number,
  // searchValue: string,
  // setSearchValue: React.Dispatch<React.SetStateAction<string>>,
  styles?: string,
  fields: any,
}

const SInput = ({ type, name, placeHolder, helperText = "", maxCharacters = undefined, max = undefined, min = undefined, styles, fields }: CPropsTypes) => {
  return (
    <div>
      <Input
        type={type}
        name={name}
        placeholder={placeHolder}
        maxLength={maxCharacters}
        max={max}
        min={min}
        // value={searchValue}
        className={`focus-visible:ring-0 ${styles}`} {...fields} />
      <p className="text-sm text-muted-foreground mt-1">{helperText}</p>
    </div>
  )
}

export default SInput
// style={{ outlineColor: "white" }}
