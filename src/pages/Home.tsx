import SInput from "@/components/SInput"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Separator } from "@radix-ui/react-separator"
import { PhoneCall } from 'lucide-react'
import { Pencil } from 'lucide-react';


type homeCardCProps = {
  img: string
}
const HomeCard = ({ img }: homeCardCProps) => {
  return (
    // src="https://photos.zillowstatic.com/fp/eb044d5179496b1ca6030f016d6bb13a-cc_ft_768.webp"
    <Card className="mb-8 md:grid md:grid-cols-2">
      <CardHeader className="p-0">
        <img
          src={img}
          width={400}
          height={200}
          className="rounded-t-md"
        />
      </CardHeader>

      <div>
        <CardContent className="pt-2">
          <p className="text-center">10191 Sunset Bend Dr, Boca Raton, FL 33428</p>

          <div className="pt-4 flex flex-row justify-center gap-2">
            <p>John Doe</p>
            <Separator orientation="vertical" className="border border-slate-200" />
            <p>Jane Doe</p>
          </div>

          <div className="pt-4 flex flex-row justify-center gap-2">
            <p>Member: 1087</p>
            <Separator orientation="vertical" className="border border-slate-200" />
            <p>Security code: 1249</p>
          </div>

          <Separator className="mt-8 border border-slate-200" />
        </CardContent>

        <CardFooter className="flex flex-row justify-between items-center">
          <PhoneCall />
          <Pencil />
        </CardFooter>
      </div>
    </Card>
  )
}

const HomePage = () => {
  return (
    <div className="mt-4 p-2 md:max-w-[50%] md:m-auto">

      <SInput type="text" name="search" placeHolder="search homes" />

      <div className="mt-4 pb-40 h-[100vh] overflow-hidden overflow-y-auto">
        <HomeCard img="https://photos.zillowstatic.com/fp/6a98016b24a7b2ccf20821306f2b589d-sc_1920_1280.webp" />
        <HomeCard img="https://photos.zillowstatic.com/fp/eb044d5179496b1ca6030f016d6bb13a-cc_ft_768.webp" />
        <HomeCard img="https://photos.zillowstatic.com/fp/923ccef6439fa33f1e290982783f0307-sc_1920_1280.webp" />
        <HomeCard img="https://photos.zillowstatic.com/fp/98de88bcef350d833a76824e10b9d5ad-cc_ft_1536.webp" />
      </div>
    </div>
  )
}

export default HomePage
