import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getTutorService, { Tutor, TutorCreateUpdate } from "../../../services/api/tutorService"
import moment from "moment"

export interface UpdateTutorData {
    access: string
    tutor: TutorCreateUpdate
}

interface Props {
    tutorId: string
    classroomId: string
    studentDni?: string
    studentName?: string
}

const useUpdateTutor = ({ tutorId, classroomId, studentDni, studentName }: Props): UseMutationResult<Tutor, Error, UpdateTutorData> => {
    const tutorService = getTutorService({ tutorId })
    const queryClient = useQueryClient()
    const day = moment().date().toString()
    const month = moment().month().toString()
    return useMutation({
        mutationFn: (data: UpdateTutorData) => tutorService.update(data.tutor, data.access),
        onSettled: res => {
            console.log('res', res)
            studentDni && queryClient.invalidateQueries({ queryKey: [`student ${studentDni}`] })
            studentName && queryClient.invalidateQueries({ queryKey: [`students ${studentName}`] })
            queryClient.invalidateQueries({  queryKey: [`students ${classroomId} ${day} ${month}`] })
            queryClient.invalidateQueries({ queryKey: [`students last ten`] })
        },
        onError: err => {
            console.log(err)
        }
    })
}

export default useUpdateTutor