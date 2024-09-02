import { houseType } from "@/common/types"

type CProps = {
  house: houseType,
  styles?: string,
}

const HomeAddress = ({ house, styles = "text-center" }: CProps) => {
  return (
    <p className={`${styles}`}>{`${house?.address} ${house?.apt}, ${house?.city} ${house?.state} ${house?.zip}`}</p>
  )
}

export default HomeAddress
