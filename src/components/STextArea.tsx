import { Textarea } from "./ui/textarea"

type CPropsTypes = {
  // type: string,
  name: string,
  placeHolder: string,
  max?: number,
  // searchValue: string,
  // setSearchValue: React.Dispatch<React.SetStateAction<string>>,
  styles?: string,
  helperText?: string,
  fields: any,
}

const STextArea = ({ name, placeHolder, helperText, max = undefined, styles, fields }: CPropsTypes) => {
  return (
    <div>
      <Textarea
        style={{ outlineColor: "white" }}
        name={name}
        placeholder={placeHolder}
        maxLength={max}
        // value={searchValue}
        className={styles} {...fields} />

      <p className="text-sm text-muted-foreground">{helperText}</p>
    </div>
  )
}

export default STextArea 
