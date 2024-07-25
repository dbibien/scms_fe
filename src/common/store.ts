// zustand
import { create } from "zustand"
import { devtools } from "zustand/middleware"
import PocketBase from 'pocketbase'
import { communityType, concernType, houseType, userType } from "./types"

const pb = new PocketBase(import.meta.env.VITE_BACKEND_URL)

// TYPES
type applicationStoreType = {
  pb: PocketBase
}

type loggedInUserType = {
  user: {
    id: string,
    community_id: string,
    first_name: string,
    last_name: string,
    type: "director" | "manager" | "regular" | "",
    verified: boolean,
    created: Date | undefined,
  }
  setLoggedInUserData: (data: loggedInUserType["user"]) => void,
}

// type housesDataFromBackend = {
//   id: string,
//   address: string,
//   member_id: string,
//   security_code: string,
//   image: string,
//   note: string,
//   expand: {
//     phones: phoneType[],
//     residents: residentType[],
//   }
// }

export type communityStore = {
  community: communityType,
  concerns: concernType[],
  houses: houseType[],
  users: userType[],
  setCommunity: (data: communityType) => void,
  setConcerns: (data: concernType[]) => void,
  setHouses: (data: houseType[]) => void,
  setUsers: (data: userType[]) => void,
  setUpdateConcern: (data: concernType) => void,
  setDeleteConcern: (data: string) => void,
}

// STORE
export const useApplicationStore = create<applicationStoreType>()(
  devtools(() => ({
    pb: pb,
  }))
)

export const useLoggedInUserStore = create<loggedInUserType>()(
  devtools((set) => ({
    user: {
      id: "",
      community_id: "",
      first_name: "",
      last_name: "",
      type: "",
      verified: false,
      created: undefined,
    },
    setLoggedInUserData: (data => set(() => ({
      user: data,
    })))
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
    users: [],
    setCommunity: (data) => (set(() => ({
      community: data,
    }))),
    setConcerns: (data) => (set(() => ({
      concerns: data,
    }))),
    // setHouses: (data) => (set(() => {
    //   const fHouses = data.map((house: housesDataFromBackend) => ({
    //     id: house.id,
    //     address: house.address,
    //     member_id: house.member_id,
    //     security_code: house.security_code,
    //     note: house.note,
    //     image: house.image,
    //     phones: house.expand.phones,
    //     resident: house.expand.residents,
    //   }))
    //   return { houses: fHouses }
    // })),
    setHouses: (data) => (set(() => {
      return { houses: data }
    })),
    setUpdateConcern: (data) => set((state) => {
      const updatedList = state.concerns.map(item => {
        if (item.id === data.id) return data // return the new updated data for the concern with same id as the new data id
        return item // if the ids are different, return the concern as if 
      })

      // console.log("updatedList: ", updatedList)
      // return state.setConcerns(updatedList)
      // state.setConcerns(updatedList)
      return { concerns: updatedList }
    }),
    setUsers: (data) => set(() => {
      return { users: data }
    }),
    setDeleteConcern: (data) => set((state) => {
      const updatedList = state.concerns?.filter(item => item?.id !== data)
      return { concerns: updatedList }
    }),
  }))
)


