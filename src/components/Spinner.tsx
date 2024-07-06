import { Bars } from "react-loader-spinner"

type CProps = {
  height?: string,
  width?: string,
  color?: string,
}

const Spinner = ({ height = "30", width = "30", color = "white" }: CProps) => {
  return (
    <Bars
      height={height}
      width={width}
      color={color}
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  )
}

export default Spinner
