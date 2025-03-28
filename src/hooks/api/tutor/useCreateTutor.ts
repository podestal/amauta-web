import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getTutorService, { Tutor, TutorCreateUpdate } from "../../../services/api/tutorService"
import moment from "moment"

export interface CreateTutorData {
    access: string
    tutor: TutorCreateUpdate
}

interface Props {
    classroomId: string
    studentDni?: string
    studentName?: string
}

const useCreateTutor = ({ classroomId, studentDni, studentName }: Props): UseMutationResult<Tutor, Error, CreateTutorData> => {
    const tutorService = getTutorService({})
    const queryClient = useQueryClient()
    const day = moment().date().toString()
    const month = moment().month().toString()
    return useMutation({
        mutationFn: (data: CreateTutorData) => tutorService.post(data.tutor, data.access),
        onSuccess: res => {
            console.log('res', res)
            studentDni && queryClient.invalidateQueries({ queryKey: [`student ${studentDni}`] })
            studentName && queryClient.invalidateQueries({ queryKey: [`students ${studentName}`] })
            queryClient.invalidateQueries({queryKey: [`students ${classroomId} ${day} ${month}`] })
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

export default useCreateTutor