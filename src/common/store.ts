// zustand
import { create } from "zustand"
import { devtools } from "zustand/middleware"
import PocketBase from 'pocketbase'
import { communityType, concernType, houseType } from "./types"

const pb = new PocketBase(import.meta.env.VITE_BACKEND_URL)

// TYPES
type applicationStore = {
  pb: PocketBase
}

type concernStore = {
  concerns: concernType[],
  setConcerns: (data: concernType[]) => void,
}

type communityStore = {
  community: communityType,
  concerns: concernType[],
  houses: houseType[],
  setCommunity: (data: communityType) => void,
  setConcerns: (data: concernType[]) => void,
  setHouses: (data: houseType[]) => void,
}

// STORE
export const useApplicationStore = create<applicationStore>()(
  devtools(() => ({
    pb: pb,
  }))
)

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
    setHouses: (data) => (set(()=> ({
      houses: data,
    }))),
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
