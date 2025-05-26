type CProps = {
  address: string,
  apt: string,
  city: string,
  state: string,
  zip: string,
  styles?: string,
}

const HomeAddress = ({ address, apt, city, state, zip, styles = "text-center" }: CProps) => {
  return (
    <p data-testid="home-address" className={`${styles}`}>{`${address} ${apt}, ${city} ${state} ${zip}`}</p>
  )
}

export default HomeAddress
