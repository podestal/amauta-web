import APIClient from "./apiClient"

export interface QuarterGrade {
    id: number
    calification: string
    quarter: string
    conclusion: string
    assignature: number
    student: number
    competence: number
}

export type QuarterGradeCreateUpdate = Omit<QuarterGrade, 'id'> & {
    conclusion?: string
}

interface Props {
    averageId?: string
}

const getQuarterGradeService = ({ averageId }: Props) => {
    const url = averageId ? `quarter-grade/${averageId}/` : `quarter-grade/`
    return new APIClient<QuarterGrade, QuarterGradeCreateUpdate>(url)
}

export default getQuarterGradeService

