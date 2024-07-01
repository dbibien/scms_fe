// zustand
import { create } from "zustand"
import { devtools } from "zustand/middleware"
import PocketBase from 'pocketbase'
import { concernType } from "./types"

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
  community: {
    id: string,
    name: string,
    address: string,
  },
  concerns: concernType[],
}

// STORE
export const useApplicationStore = create<applicationStore>()(
  devtools(() => ({
    pb: pb,
  }))
)

export const useCommunityStore = create<communityStore>()(
  devtools(() => ({}))
)

export const useConcernStore = create<concernStore>()(
  devtools((set) => ({
    concerns: [],

    setConcerns: (data) => (set(() => ({
      concerns: data,
    }))),
  }))
)
