import APIClient from "./apiClient"

// calification = models.CharField(max_length=2, choices=CALIFICATION_CHOICES)
// area = models.ForeignKey(Area, on_delete=models.CASCADE, related_name='averages')
// student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='area_averages')
// quarter = models.CharField(max_length=2, choices=QUARTER_CHOICES)

export interface AreaGrade {
    id: number
    calification: string
    area: number
    student: number
    quarter: string
}

export type CreateUpdateAreaGrade = Omit<AreaGrade, 'id'> 

interface Props {
    areaGradeId?: number
}

const getAreaGradeService = ({ areaGradeId }: Props) => {
    const url = areaGradeId ? `area-grade/${areaGradeId}/` : 'area-grade/'
    return new APIClient<AreaGrade, CreateUpdateAreaGrade>(url)
}
export default getAreaGradeService