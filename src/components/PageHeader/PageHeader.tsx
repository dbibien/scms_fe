type CProps = {
  title: string
}
const PageHeader = ({ title }: CProps) => {
  return (
    <h1
      data-testid="page-header"
      className="text-2xl text-black font-bold mb-2"
    >
      {title}
    </h1>
  )
}

export default PageHeader
