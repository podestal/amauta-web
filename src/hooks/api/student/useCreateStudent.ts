import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getStudentService, { Student, StudentCreateUpdate } from "../../../services/api/studentsService"
import { getStudentsCacheKey } from "../../../utils/cacheKeys"

interface CreateStudentProps {
    access: string
    student: StudentCreateUpdate
}

const useCreateStudent = (): UseMutationResult<Student, Error, CreateStudentProps> => {

    const studentService = getStudentService({all: true})
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: CreateStudentProps) => studentService.post(data.student, data.access),
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

export default useCreateStudent