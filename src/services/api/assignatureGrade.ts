import APIClient from "./apiClient"


// calification = models.CharField(max_length=2, choices=CALIFICATION_CHOICES)
// assignature = models.ForeignKey(Assignature, on_delete=models.CASCADE, related_name='assignature_averages')
// student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='assignature_averages')
// quarter = models.CharField(max_l

export interface AssignatureGrade {
    id: number
    calification: string
    assignature: number
    student: number
    quarter: string
}

export type CreateUpdateAssignatureGrade = Omit<AssignatureGrade, 'id'>

interface Props {
    assignatureGradeId?: number
}

const getAssignatureGradeService = ({ assignatureGradeId }: Props) => {
    const url = assignatureGradeId ? `assignature-grade/${assignatureGradeId}/` : 'assignature-grade/'
    return new APIClient<AssignatureGrade, CreateUpdateAssignatureGrade>(url)
}

export default getAssignatureGradeService