import { Input } from "./ui/input"

type CPropsTypes = {
  type: string,
  name: string,
  placeHolder: string,
  styles?: string,
}

const SInput = ({type, name, placeHolder, styles}: CPropsTypes) => {
  return (
    <div>
      <Input type={type} name={name} placeholder={placeHolder} className={styles} />
    </div>
  )
}

export default SInput
