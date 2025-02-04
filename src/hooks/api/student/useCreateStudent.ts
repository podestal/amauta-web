import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getStudentService, { Student, StudentCreateUpdate } from "../../../services/api/studentsService"
import { getStudentsCacheKey } from "../../../utils/cacheKeys"

export interface CreateStudentData {
    access: string
    student: StudentCreateUpdate
}

const useCreateStudent = (): UseMutationResult<Student, Error, CreateStudentData> => {

    const studentService = getStudentService({all: true})
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: CreateStudentData) => studentService.post(data.student, data.access),
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