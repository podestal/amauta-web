import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getStudentService, { Student, StudentCreateUpdate } from "../../../services/api/studentsService"
import moment from "moment"

export interface CreateStudentData {
    access: string
    student: StudentCreateUpdate    
}

interface Props {
    classroomId: string
}

const useCreateStudent = ({ classroomId }: Props): UseMutationResult<Student, Error, CreateStudentData> => {

    const studentService = getStudentService({all: true})
    const queryClient = useQueryClient()
    const day = moment().date().toString()
    const month = moment().month().toString()
    return useMutation({
        mutationFn: (data: CreateStudentData) => studentService.post(data.student, data.access),
        onSuccess: res => {
            console.log('res',res)
            queryClient.invalidateQueries({ queryKey: [`students ${classroomId} ${day} ${month}`] })
            queryClient.invalidateQueries({ queryKey: [`students last ten`] })
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