import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getStudentService, { Student, StudentCreateUpdate } from "../../../services/api/studentsService"
import { getStudentsCacheKey } from "../../../utils/cacheKeys"

export interface UpdateStudentData {
    access: string
    student: StudentCreateUpdate
}

interface Props {
    studentId: string
}

const useUpdateStudent = ({ studentId }: Props): UseMutationResult<Student, Error, UpdateStudentData> => {
    const queryClient = useQueryClient()
    const studentService = getStudentService({studentId})

    return useMutation({
        mutationFn: (data: UpdateStudentData) => studentService.update(data.student, data.access),
        onSuccess: res => {
            console.log('res',res)
            queryClient.invalidateQueries({ queryKey: getStudentsCacheKey(('all')) })
            // queryClient.setQueryData<Student[]>(getStudentsCacheKey((res.clase).toString()), (oldData) => {
            //     if (!oldData) return []
            //     return [...oldData, res]
            // })
        },
        onError: err => {
            console.log(err)
        }
    })
}

export default useUpdateStudent