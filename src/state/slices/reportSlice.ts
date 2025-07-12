import { StateCreator } from "zustand"
import { cloneDeep } from "lodash"
import { IReport } from "@/models"

type TReports = Record<string, IReport>

interface IState {
    reports: TReports
}

interface IActions {
    setReports: (report: TReports) => void
    upsertReport: (report: IReport) => void
    deleteReport: (reportId: string) => void
}

export type ReportSlice = IState & IActions

export const createReportSlice: StateCreator<ReportSlice> = (set) => ({
    reports: {},
    setReports: (reports: TReports) => set(() => ({ reports })),
    upsertReport: (report: IReport) => set((state) => ({ reports: { ...state.reports, [report.id]: report } })),
    deleteReport: (reportId: string) => set((state) => {
        const newReports = cloneDeep(state.reports)
        delete newReports[reportId]

        return newReports
    }),
})
