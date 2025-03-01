import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getGradeService, { Grade, UpdateCreateGrade } from "../../../services/api/gradeService"

interface UpdateGradeData {
    access: string
    grade: UpdateCreateGrade
}

interface Props {
    gradeId: number
    activityId: string
}

const useUpdateGrade = ({ gradeId, activityId }: Props): UseMutationResult<Grade, Error, UpdateGradeData> => {
    const gradeService = getGradeService({ gradeId: gradeId.toString() })
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: UpdateGradeData) => gradeService.update(data.grade, data.access),
        onSuccess: res => {
            console.log(res);
            
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