import { phoneType } from "@/common/types"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type CProps = {
  phones: phoneType[],
  pending_call_concerns_ids: string,
  callInProgress: boolean,
  house_check: boolean,
}

const HomeNotice = ({ phones, pending_call_concerns_ids, callInProgress, house_check }: CProps) => {
  return (
    <>
      {phones.length === 0 || pending_call_concerns_ids !== "" || callInProgress || house_check ? (<div data-testid="home-notice-container">
        <Separator
          data-testid="home-notice-separator"
          className="mt-6 border border-slate-200"
        />
        <div className="mt-4">
          <p className="text-sm underline text-slate-500">Notice:</p>
          {/*<div className="space-y-2 spce-x-2">*/}
          <div className="flex flex-row gap-2 items-center">
            {phones.length === 0 && <p data-testid="home-notice-phones" className="text-sm text-orange-400 p-2 inline-block rounded-md bg-orange-100">Primary phone number missing</p>}
            {pending_call_concerns_ids && <p data-testid="home-notice-pending" className="text-sm text-slate-500 p-2 inline-block rounded-md bg-sky-200 ml-2">Call pending</p>}
            {callInProgress && <p data-testid="home-notice-callprog" className="text-sm text-pink-500 p-2 inline-block rounded-md bg-pink-200 animate-pulse">Call in progress...</p>}
            {house_check && (
              <HouseCheckDialogue />
            )}
          </div>
        </div>
      </div>) : ""}
    </>
  )
}

export default HomeNotice


const HouseCheckDialogue = () => {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          data-testid="home-notice-houseCheck"
          className="text-sm text-purple-500 p-2 rounded-md bg-purple-200 hover:bg-purple-300"
        >
          House check
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col items-center" >
          <DialogTitle>House Check</DialogTitle>
          <DialogDescription>
            21341 Highland Circle
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>

        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
