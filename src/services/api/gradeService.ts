import APIClient from "./apiClient"

// calification = models.CharField(max_length=2, choices=CALIFICATION_CHOICES, default='NA')
// student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='grades')
// activity = models.ForeignKey(Activity, on_delete=models.CASCADE, related_name='grades')
// assignature = models.ForeignKey(Assignature, on_delete=models.CASCADE, related_name='grades')
// created_at = models.DateField(auto_now_add=True)
// observations = models.TextField(null=True, blank=True)

interface GradeStudent {
    uid: number
    first_name: string
    last_name: string
}

export interface GradeByActivity {
    id: number
    calification: string
    student: GradeStudent
    observations: string
}

export interface Grade {
    id: number
    calification: string
    student: number
    activity: number
    assignature: number
    created_at: Date
    observations: string
}

export type UpdateCreateGrade = Omit<Grade, 'id' | 'created_at' | 'student' | 'activity' | 'assignature'>

interface Props {
    gradeId?: string
    byActivity?: boolean
}

const getGradeService = ({ gradeId, byActivity }: Props) => {
    let url = 'grade/'
    if (gradeId) url = `grade/${gradeId}/`
    if (byActivity) url = 'grade/byActivity/'
    return new APIClient<Grade, UpdateCreateGrade>(url)
}

export default getGradeService