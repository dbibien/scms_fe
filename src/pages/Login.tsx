import SInput from "@/components/SInput"
import { Button } from "@/components/ui/button"

const LoginPage = () => {
  return (
    <>
      <div className="bg-black h-[40vh] flex justify-center items-end">
        <p className="text-white text-3xl font-bold">SCMS</p>
      </div>

      <div className="p-2 pt-8 md:max-w-[50%] md:m-auto">
        <p className="text-center text-xl">Log in to manage your community</p>

        <SInput
          type="email"
          name="email"
          placeHolder="email"
          styles="mt-8"
        />

        <SInput
          type="password"
          name="password"
          placeHolder="password"
          styles="mt-8"
        />

        <Button type="submit" className="w-full mt-8">Login</Button>
      </div>
    </>
  )
}

export default LoginPage 
