// zustand
import { create } from "zustand"
import { devtools } from "zustand/middleware"
import PocketBase from 'pocketbase'

// const pb = new PocketBase(import.meta.env.VITE_BACKEND_URL)
const pb = new PocketBase("http://127.0.0.1:8090")

// TYPES
type applicationStore = {
  pb: PocketBase 
}

// STORE
export const useApplicatonStore = create<applicationStore>()(
  devtools((set) => ({
    pb: pb,
  }))
)
