import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Phone, PhoneCall, Ban } from 'lucide-react'
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import CheckBox from "@/components/CheckBox"
import ConcernSelectorViewer from "@/components/ConcernSelectorViewer"
import Spinner from "@/components/Spinner"
import HomeUpdate from "@/components/HomeUpdate"
import HomeAddress from "@/components/HomeAddress/HomeAddress";
import { useApplicationStore, useCommunityStore, useLoggedInUserStore } from "@/common/store"
import { concernType, houseType, selectConcernsType } from "@/common/types"
import { useEffect, useState } from "react";
import { toast } from "./ui/use-toast";
import SplInput from "./SplInput";
import Note from "./Note";
import { Separator } from "./ui/separator";
import HomeNotice from "./HomeNotice/HomeNotice";

type homeCardType = {
  house: houseType,
  getHomeData: () => Promise<void>,
}

const HomeCard = ({ house, getHomeData }: homeCardType) => {
  const pb = useApplicationStore(state => state.pb)
  const concerns = useCommunityStore(state => state.concerns)
  const loggedInUserCommunityId = useLoggedInUserStore(state => state.user.community_id)
  const setConcerns = useCommunityStore(state => state.setConcerns)

  const [openSheet, setOpenSheet] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectConcerns, setSelectConcerns] = useState<selectConcernsType[]>([])
  const [searchValue, setSearchValue] = useState("")
  const [imageError, setImageError] = useState(false)
  const [callInProgress, setCallInProgress] = useState(false)

  const getConcerns = async () => {
    // NOTE: duplicated code. Good use for a custom hook
    setLoading(true)
    try {
      const records: concernType[] = await pb.collection('concerns').getFullList({
        filter: `community.id = "${loggedInUserCommunityId}"`,
        fields: "id, name, hint, say",
      })

      // console.log("records: ", records)
      // console.log("records.expand: ", records[0].expand?.concerns)
      // const concerns = records[0].expand?.concerns === undefined ? [] : records[0].expand?.concerns
      setConcerns(records)
    } catch (e) {
      console.log("e:", e)
      toast({
        variant: "destructive",
        title: "Fail",
        description: "Fail to retrieve concerns"
      })
    } finally {
      setLoading(false)
    }
  }

  const callResident = async () => {
    try {
      const res = await pb.send(`/api/scms/call-resident`, {
        method: "post",
        headers: {
          "Content-type": "application/json",
          "Authorization": `${pb.authStore.token} `,
        },
        body: JSON.stringify({
          h_id: house?.id,
          concerns: selectConcerns
        })
      })

      // console.log("res: ", res)
      if (res?.code === 200) {
        // await getHomeData()
        setCallInProgress(true)
        toast({
          variant: "default",
          title: "Success",
          description: res?.message,
        })
      }
    } catch (e) {
      // console.log("e.data: ", e?.data)
      // console.log("e: ", e)
      // @ts-expect-error fix types later
      const errData = e?.data
      if (errData?.error) {
        toast({
          variant: "destructive",
          title: "Fail",
          description: errData?.message,
        })
      }
    } finally {
      await getHomeData()
      setOpenSheet(false)
      setInterval(() => {
        setCallInProgress(false)
      }, 20000)
    }
  }

  const handleRemoveConcern = (id: string) => {
    const newSelectedConcernsList = selectConcerns.filter(concern => (concern.id !== id))
    setSelectConcerns(newSelectedConcernsList)
  }

  const handleSearchConcerns = (concern: concernType) => {
    if (searchValue === "") return concern

    if (concern.name.toLowerCase().includes(searchValue.toLowerCase())) return concern
  }

  useEffect(() => {
    if (house?.pending_call_concerns_ids) {
      const concernIds = house?.pending_call_concerns_ids.split(",")
      const preselectConcerns: selectConcernsType[] = []
      for (let i = 0; i < concernIds.length; i++) {
        for (let j = 0; j < concerns.length; j++) {
          if (concerns[j]?.id === concernIds[i]) {
            preselectConcerns.push({
              id: concerns[j]?.id,
              name: concerns[j]?.name,
              selected: true,
            })
          }
        }
      }
      setSelectConcerns(preselectConcerns)
    }
  }, [concerns])

  // console.log("note: ", house?.note)
  // console.log("house in: ", house)
  // console.log("selected concerns: ", selectConcerns)
  // console.log("searchValue: ", searchValue)

  return (
    <Card className="mb-8 mt-4 lg:grid lg:grid-cols-[2fr_2fr_2fr]">
      <CardHeader className={`p-0 ${imageError ? "bg-white" : "bg-black"} flex flex-row items-center`}>
        <img
          src={imageError ? "/assets/homeDefault.jpg" : `${import.meta.env.VITE_BACKEND_URL}/api/files/houses/${house?.id}/${house?.image}`}
          width="100%"
          height="auto"
          onError={() => setImageError(true)}
          className="object-cover"
        />
      </CardHeader>

      <div>
        <CardContent className="pt-2">
          <HomeAddress
            address={house?.address}
            apt={house?.apt}
            city={house?.city}
            state={house?.state}
            zip={house?.zip}
          />

          <div className="pt-2 flex flex-row justify-center gap-2">
            {house?.residents.map((resident, index) => {
              return (
                <div key={resident.id} className="flex flex-row gap-2">
                  <p>{resident?.first_name} {resident?.last_name}</p>
                  {index + 1 !== house?.residents.length && (
                    <Separator orientation="vertical" className="border border-slate-200" />
                  )}
                </div>
              )
            })}
          </div>

          <div className="pt-4 flex flex-row justify-center gap-2">
            <p>Member: {house?.member_number}</p>
            <Separator orientation="vertical" className="border border-slate-200" />
            <p>Security code: {house?.security_code}</p>
          </div>

          {house?.note && (<>
            <Separator className="mt-6 border border-slate-200" />
            <div className="mt-4">
              <p className="text-sm underline text-slate-500">Note:</p>
              <Note note={house?.note} />
            </div>
          </>)
          }

          <HomeNotice
            now={new Date()}
            phones={house?.phones}
            pending_call_concerns_ids={house?.pending_call_concerns_ids}
            callInProgress={callInProgress}
            house_check={house?.house_check}
            id={house?.id}
            address={house?.address}
            apt={house?.apt}
            city={house?.city}
            state={house?.state}
            zip={house?.zip}
            note={house?.note}
            house_check_note={house?.house_check_note}
            residents={house?.residents}
            houseCheckStartDate={new Date(house?.house_check_start_date)}
            houseCheckEndDate={new Date(house?.house_check_end_date)}
            houseLastChecked={new Date(house?.house_check_last_date)}
          />

        </CardContent>
      </div>

      <CardFooter className="flex flex-row justify-between items-center border-t pt-6 lg:border-l lg:border-l-slate-200 lg:items-end lg:pt-4 lg:border-t-0">
        <Sheet open={openSheet} onOpenChange={setOpenSheet}>
          <SheetTrigger>
            <button onClick={getConcerns}>
              <PhoneCall />
            </button>
          </SheetTrigger>

          <SheetContent side="bottom">
            <SheetHeader>
              <SheetTitle className="text-center">
                Select concerns
              </SheetTitle>

              <p className="text-center">{`${house?.address} ${house?.apt}, ${house?.city} ${house?.state}, ${house?.zip}`}</p>
              <Separator orientation="horizontal" className="border border-slate-200" />
            </SheetHeader>

            <div className="mt-2 pl-2 pr-2 pb-2 lg:w-[50%] lg:mx-auto">
              <ConcernSelectorViewer
                selectConcerns={selectConcerns}
                handleRemoveConcern={handleRemoveConcern}
              />

              <SplInput
                type="text"
                name="search"
                placeHolder="Search concerns..."
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                styles="text-lg"
              />

              {loading === true ? (
                <>
                  <div className="flex justify-center">
                    <Spinner color="black" />
                  </div>
                  <p className="text-center text-slate-400">Loading concerns...</p>
                </>
              ) : (
                <ScrollArea className="max-h-56 pl-2 pr-2 bg-slate-50">
                  {
                    concerns.filter(handleSearchConcerns).map(concern => (
                      <div key={concern?.id} className="mt-4">
                        <CheckBox
                          id={concern?.id}
                          name={concern?.name}
                          hint={concern?.hint}
                          checked={
                            selectConcerns.filter(sc => (sc.id === concern.id && sc.selected === true)).length === 1 && true
                          }
                          selectConcerns={selectConcerns}
                          setSelectConcerns={setSelectConcerns}
                        />
                      </div>
                    ))
                  }
                </ScrollArea>
              )}

              <Sheet>
                <SheetTrigger
                  disabled={selectConcerns.length === 0}
                  className="w-full"
                >
                  <Button
                    disabled={selectConcerns.length === 0}
                    className="flex flex-row  gap-2 items-end w-full mt-4"
                  >
                    <Phone />
                    Reach Out To Resident
                  </Button>
                </SheetTrigger>

                <SheetContent side="bottom">
                  <div className="lg:w-[50%] lg:mx-auto">
                    <h3 className="text-center text-xl font-bold-[400px]">
                      Are you sure you want to call the resident?
                    </h3>

                    <div className="mt-4">
                      <ConcernSelectorViewer
                        selectConcerns={selectConcerns}
                        handleRemoveConcern={handleRemoveConcern}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <SheetClose
                        disabled={selectConcerns.length === 0}
                      >
                        <Button
                          type="submit"
                          disabled={selectConcerns.length === 0}
                          onClick={() => callResident()}
                          className="flex flex-row  gap-2 items-end w-full mt-4"
                        >
                          <Phone />
                          Call
                        </Button>
                      </SheetClose>

                      <SheetClose>
                        <Button
                          color="red"
                          className="flex flex-row gap-2 items-end w-full mt-4 bg-red-400 hover:bg-red-500"
                        >
                          <Ban />
                          Cancel
                        </Button>
                      </SheetClose>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </SheetContent>
        </Sheet>

        <HomeUpdate house={house} getHomeData={getHomeData} />
      </CardFooter>
    </Card>
  )
}

export default HomeCard
