import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getGradeService, { Grade, UpdateCreateGrade } from "../../../services/api/gradeService"
// import {StudentByGrade} from "../../../services/api/studentsService"

interface UpdateGradeData {
    access: string
    grade: UpdateCreateGrade
}

interface Props {
    gradeId: number
    activityId: string
    updateCacheKey?: string[]
}

const useUpdateGrade = ({ gradeId, activityId, updateCacheKey }: Props): UseMutationResult<Grade, Error, UpdateGradeData> => {
    const gradeService = getGradeService({ gradeId: gradeId.toString() })
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: (data: UpdateGradeData) => gradeService.update(data.grade, data.access),
        onSuccess: res => {
            console.log(res);
            // updateCacheKey && queryClient.setQueryData<StudentByGrade[]>(updateCacheKey, (oldData) => {
            //     if (!oldData) return []
                
            //     return oldData.map(student => {
            //         const grades = student.filtered_grades.map(grade => {
            //             if (grade.id === res.id) {
            //                 grade.calification = res.calification
            //                 return grade
            //             }
            //             return grade
            //         })
            //         return { ...student, grades }
            //     })
            // })
            updateCacheKey && queryClient.invalidateQueries({ queryKey: updateCacheKey })
            queryClient.setQueryData<Grade[]>([`grades ${activityId}`], (oldData) => {
                if (!oldData) return [res]
                return oldData.map(grade => grade.id === res.id ? res : grade)
            })
        },
        onError: err => {
            console.log(err)
        }
    })
}

export default useUpdateGrade