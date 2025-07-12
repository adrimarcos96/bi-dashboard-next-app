import { StateCreator } from "zustand"
import { cloneDeep } from "lodash"
import { ICompany } from "@/models/companyModel"

type TCompaniesState = Record<string, ICompany>

interface IState {
    companies: TCompaniesState
}

interface IActions {
    setCompanies: (companies: TCompaniesState) => void
    upsertCompany: (company: ICompany) => void
    deleteCompany: (companyId: string) => void
}

export type CompanySlice = IState & IActions

export const createCompanySlice: StateCreator<CompanySlice> = (set) => ({
    companies: {},
    setCompanies: (companies: TCompaniesState) => set(() => ({ companies: cloneDeep(companies) })),
    upsertCompany: (company: ICompany) => set((state) => ({ companies: { ...state.companies, [company.id]: company } })),
    deleteCompany: (companyId: string) => set((state) => {
        const newCompanies = cloneDeep(state.companies)
        delete newCompanies[companyId]

        return newCompanies
    }),
})
