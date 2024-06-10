import { Input } from "./ui/input"

type CPropsTypes = {
  type: string,
  name: string,
  placeHolder: string,
  styles?: string,
  fields?: any,
}

const SInput = ({type, name, placeHolder, styles, fields}: CPropsTypes) => {
  return (
    <div>
      <Input type={type} name={name} placeholder={placeHolder} className={styles} {...fields} />
    </div>
  )
}

export default SInput
