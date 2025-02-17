import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getStudentService, { Student, StudentCreateUpdate } from "../../../services/api/studentsService"
import moment from "moment"

export interface UpdateStudentData {
    access: string
    student: StudentCreateUpdate
}

interface Props {
    studentId: string
    classroomId: string
}

const useUpdateStudent = ({ studentId, classroomId }: Props): UseMutationResult<Student, Error, UpdateStudentData> => {
    const queryClient = useQueryClient()
    const studentService = getStudentService({studentId})
    const day = moment().date().toString()
    const month = moment().month().toString()

    return useMutation({
        mutationFn: (data: UpdateStudentData) => studentService.update(data.student, data.access),
        onSuccess: res => {
            console.log('res',res)
            queryClient.invalidateQueries({ queryKey: [`students ${classroomId} ${day} ${month}`] })
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