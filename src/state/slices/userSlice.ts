import { StateCreator } from "zustand"
import { cloneDeep } from "lodash"
import { IUser } from "@/models"

interface IState {
    user: IUser | null
}

interface IActions {
    setUser: (user: IUser) => void
}

export type UserSlice = IState & IActions

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
    user: null,
    setUser: (user: IUser) => set(() => ({ user: cloneDeep(user) }))
})
