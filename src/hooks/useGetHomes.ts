import { houseType, phoneType, residentType } from "@/common/types"
import { useCallback, useEffect, useState } from "react"
import { useApplicationStore, useCommunityStore } from "@/common/store"

const useGetHomes = (loggedInUserCommunityId: string, autoFetch = true) => {
  const pb = useApplicationStore(state => state.pb)

  const houses = useCommunityStore(state => state.houses)
  const setHouses = useCommunityStore(state => state.setHouses)
  // const [data, setData] = useState<houseType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null);


  const getHomeData = useCallback(async () => {
    setIsLoading(true)

    try {
      // fields the backend should return
      const houseFields = `id, address, apt, city, state, zip, member_number, security_code, pending_call_concerns_ids, image, note, house_check, house_check_start_date, house_check_end_date, house_check_last_date, house_check_note`
      const phoneFields = `
        expand.phones_via_house.id, expand.phones_via_house.phone_number, expand.phones_via_house.primary, expand.phones_via_house.type
      `
      const residentFields = `
        expand.residents_via_house.id, expand.residents_via_house.first_name, expand.residents_via_house.last_name, expand.residents_via_house.owner,
      `
      const fields = `${houseFields}, ${phoneFields}, ${residentFields}`
      const records = await pb.collection('houses').getFullList({
        filter: `community.id = '${loggedInUserCommunityId}'`,
        fields: fields,
        expand: 'phones_via_house, residents_via_house',
      })

      const houses: houseType[] = records.map((house) => {
        const phones: phoneType[] = house?.expand?.phones_via_house?.map((phone: phoneType) => ({
          id: phone?.id,
          phone_number: phone?.phone_number,
          primary: phone?.primary,
          type: phone?.type,
        }))

        const residents: residentType[] = house?.expand?.residents_via_house?.map((resident: residentType) => ({
          id: resident?.id,
          first_name: resident?.first_name,
          last_name: resident?.last_name,
          owner: resident?.owner,
        }))

        const data: houseType = {
          id: house?.id,
          address: house?.address,
          apt: house?.apt,
          city: house?.city,
          state: house?.state,
          zip: house?.zip,
          image: house?.image,
          member_number: house?.member_number,
          security_code: house?.security_code,
          pending_call_concerns_ids: house?.pending_call_concerns_ids,
          note: house?.note,
          house_check: house?.house_check,
          house_check_start_date: house?.house_check_start_date,
          house_check_end_date: house?.house_check_end_date,
          house_check_last_date: house?.house_check_last_date,
          house_check_note: house?.house_check_note,
          phones: phones || [],
          residents: residents || [],
        }

        return data
      })

      setHouses(houses)
    } catch (e) {
      // @ts-expect-error fix types later  
      setError(e)

      console.log("e:", e)
      // const errData = e?.data
      // if (errData?.code === 400) {
      //   toast({
      //     variant: "destructive",
      //     title: "Fail",
      //     description: errData?.message,
      //   })
      // }
    } finally {
      setIsLoading(false)
    }
  }, [loggedInUserCommunityId, houses, setHouses, setIsLoading, setError])

  useEffect(() => {
    if (autoFetch) getHomeData()
  }, [])

  return { houses, isLoading, error, getHomeData }
}

export default useGetHomes
