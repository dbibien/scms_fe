import { Input } from "./ui/input"

type CPropsTypes = {
  type: string,
  name: string
}

const SInput = ({type, name}: CPropsTypes) => {
  return (
    <Input type={type} name={name}/>
  )
}

export default SInput
