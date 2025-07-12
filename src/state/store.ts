import { create, StoreApi, UseBoundStore } from "zustand"
import { createUserSlice, UserSlice } from "./slices/userSlice"
import { createReportSlice, ReportSlice } from "./slices/reportSlice"

export type TAppStore = UserSlice & ReportSlice

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S,
) => {
  const store = _store as WithSelectors<typeof _store>
  store.use = {}

  Object.keys(store.getState()).forEach(key => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (store.use as any)[key] = () => store((s) => s[key as keyof typeof s])
  })

  return store
}

export const useAppStoreBase = create<TAppStore>()((...a) => ({
  ...createUserSlice(...a),
  ...createReportSlice(...a)
}))

export const useAppStore = createSelectors(useAppStoreBase)
