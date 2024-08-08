import { Info } from "lucide-react"

const NoResultFound = ({ message }: { message: string }) => {
  return (
    <div className="bg-amber-100 md:max-w-[50%] m-auto mt-4 p-4 rounded-md">
      <Info color="orange" />
      <p className="text-center">{message}</p>
    </div>
  )
}

export default NoResultFound
