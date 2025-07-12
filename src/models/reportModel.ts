export interface IReportCard {
    total: number
    average: number
}

export interface ILineChartData {
    date: string
    value: number
}

export interface IBarChartData {
    category: string
    value: number
}

export interface IReport {
    id: string
    name: string
    cards: IReportCard
    line: ILineChartData
    bar: IBarChartData
    companyId: string
}
