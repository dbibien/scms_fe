import { Textarea } from "./ui/textarea"

type CPropsTypes = {
  // type: string,
  name: string,
  placeHolder: string,
  // searchValue: string,
  // setSearchValue: React.Dispatch<React.SetStateAction<string>>,
  styles?: string,
  helperText?: string,
  fields: any,
}

const STextArea = ({ name, placeHolder, helperText, styles, fields }: CPropsTypes) => {
  return (
    <div>
      <Textarea
        name={name}
        placeholder={placeHolder}
        // value={searchValue}
        className={styles} {...fields} />

      <p className="text-sm text-muted-foreground">{helperText}</p>
    </div>
  )
}

export default STextArea 
