// zustand
import { create } from "zustand"
import { devtools } from "zustand/middleware"
import PocketBase from 'pocketbase'
import { communityType, concernType, houseType, phoneType, residentType } from "./types"

const pb = new PocketBase(import.meta.env.VITE_BACKEND_URL)

// TYPES
type applicationStore = {
  pb: PocketBase
}

type concernStore = {
  concerns: concernType[],
  setConcerns: (data: concernType[]) => void,
}

type housesDataFromBackend = {
  id: string,
  address: string,
  member_id: string,
  security_code: string,
  image: string,
  note: string,
  expand: {
    phones: phoneType[],
    residents: residentType[],
  }
}

// STORE
export const useApplicationStore = create<applicationStore>()(
  devtools(() => ({
    pb: pb,
  }))
)

export type communityStore = {
  community: communityType,
  concerns: concernType[],
  houses: houseType[],
  setCommunity: (data: communityType) => void,
  setConcerns: (data: concernType[]) => void,
  setHouses: (data: housesDataFromBackend[]) => void,
}

export const useCommunityStore = create<communityStore>()(
  devtools((set) => ({
    community: {
      id: "",
      name: "",
      address: "",
    },
    concerns: [],
    houses: [],
    setCommunity: (data) => (set(() => ({
      community: data,
    }))),
    setConcerns: (data) => (set(() => ({
      concerns: data,
    }))),
    // @ts-expect-error I need to look into what I am doing wrong as far as the types goes
    setHouses: (data) => (set(() => {
      const fHouses = data.map((house: housesDataFromBackend) => ({
        id: house.id,
        address: house.address,
        member_id: house.member_id,
        security_code: house.security_code,
        note: house.note,
        image: house.image,
        phones: house.expand.phones,
        resident: house.expand.residents,
      }))
      return {houses: fHouses}
    })),
  }))
)

export const useConcernStore = create<concernStore>()(
  devtools((set) => ({
    concerns: [],

    setConcerns: (data) => (set(() => ({
      concerns: data,
    }))),
  }))
)
