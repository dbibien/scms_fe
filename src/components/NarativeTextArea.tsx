
import { Textarea } from "./ui/textarea"

type CPropsTypes = {
  name: string,
  placeHolder: string,
  value: string,
  max?: number,
  styles?: string,
  helperText?: string,
  fields: any,
}

const NarativeTextArea = ({ name, placeHolder, value, helperText, max = undefined, styles, fields }: CPropsTypes) => {
  return (
    <div>
      <Textarea
        style={{ outlineColor: "white" }}
        name={name}
        placeholder={placeHolder}
        value={value}
        maxLength={max}
        className={styles} {...fields}
      />

      <p className="text-sm text-muted-foreground">{helperText}</p>
    </div>
  )
}

export default NarativeTextArea 
