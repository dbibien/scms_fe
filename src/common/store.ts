// zustand
import { create } from "zustand"
import { devtools } from "zustand/middleware"
import PocketBase from 'pocketbase'
import { concernType } from "./types"

const pb = new PocketBase(import.meta.env.VITE_BACKEND_URL)
// const pb = new PocketBase("http://127.0.0.1:8090")

// TYPES
type applicationStore = {
  pb: PocketBase
}


type concernStore = {
  concerns: concernType[],
  setConcerns: (data: concernType[]) => void,
}

// STORE
export const useApplicatonStore = create<applicationStore>()(
  devtools(() => ({
    pb: pb,
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
