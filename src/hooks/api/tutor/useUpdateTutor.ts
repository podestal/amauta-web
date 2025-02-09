import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getTutorService, { Tutor, TutorCreateUpdate } from "../../../services/api/tutorService"
import { getStudentsCacheKey } from "../../../utils/cacheKeys"

export interface UpdateTutorData {
    access: string
    tutor: TutorCreateUpdate
}

interface Props {
    tutorId: string
}

const useUpdateTutor = ({ tutorId }: Props): UseMutationResult<Tutor, Error, UpdateTutorData> => {
    const tutorService = getTutorService({ tutorId })
    const queryClient = useQueryClient()
    const studentsCacheKey = getStudentsCacheKey('all')
    return useMutation({
        mutationFn: (data: UpdateTutorData) => tutorService.update(data.tutor, data.access),
        onSettled: res => {
            console.log('res', res)
            queryClient.invalidateQueries({  queryKey: studentsCacheKey })
        },
        onError: err => {
            console.log(err)
        }
    })
}

export default useUpdateTutor