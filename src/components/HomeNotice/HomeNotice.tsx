import { phoneType, residentType } from "@/common/types"
import { Separator } from "../ui/separator"
import HouseCheckDialogue from "../HouseCheckDialogue/HouseCheckDialogue"
import { shouldHouseBeAddedToHouseCheckList } from "@/common/utils"

type CProps = {
  phones: phoneType[],
  pending_call_concerns_ids: string,
  callInProgress: boolean,
  house_check: boolean,
  now: Date,

  // house props
  id: string,
  address: string,
  apt: string,
  city: string,
  state: string,
  zip: string,
  note: string,
  house_check_note: string,
  residents: residentType[]
  houseCheckStartDate: Date,
  houseCheckEndDate: Date,
  houseLastChecked: Date | null,
}

const HomeNotice = ({
  phones,
  pending_call_concerns_ids,
  callInProgress,
  house_check,
  id,
  address,
  apt,
  city,
  state,
  zip,
  note,
  house_check_note,
  residents,
  houseCheckStartDate,
  houseCheckEndDate,
  houseLastChecked,
  now,
}: CProps) => {


  // const house = {
  //   address: address,
  //   start: houseCheckStartDate,
  //   end: houseCheckEndDate,
  //   last: houseLastChecked,
  // }

  // console.log("house: ", house, shouldHouseBeAddedToHouseCheckList(houseCheckStartDate, houseCheckEndDate, houseLastChecked))
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
            {(house_check && shouldHouseBeAddedToHouseCheckList(now, houseCheckStartDate, houseCheckEndDate, houseLastChecked)) && (
              <HouseCheckDialogue
                id={id}
                address={address}
                apt={apt}
                city={city}
                state={state}
                zip={zip}
                note={note}
                house_check_note={house_check_note}
                residents={residents}
              />
            )}
          </div>
        </div>
      </div>) : ""}
    </>
  )
}

export default HomeNotice
