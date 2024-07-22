import { houseType } from "@/common/types"

type CProps = {
  house: houseType
}

const HomeAddress = ({ house }: CProps) => {
  return (
    <p className="text-center">{`${house?.address} ${house?.apt}, ${house?.city} ${house?.state} ${house?.zip}`}</p>
  )
}

export default HomeAddress
