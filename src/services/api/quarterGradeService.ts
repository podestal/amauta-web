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

export type QuarterGradeCreateUpdate = Omit<QuarterGrade, 'id' | 'conclusion' | 'assignature' | 'student' | 'competence' | 'quarter'> & {
    conclusion?: string
    assignature?: number
    student?: number
    competence?: number
    quarter?: string
}

interface Props {
    quarterGradeId?: string
}

const getQuarterGradeService = ({ quarterGradeId }: Props) => {
    const url = quarterGradeId ? `quarter-grade/${quarterGradeId}/` : `quarter-grade/`
    return new APIClient<QuarterGrade, QuarterGradeCreateUpdate>(url)
}

export default getQuarterGradeService

