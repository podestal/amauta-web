import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getTutorService, { Tutor, TutorCreateUpdate } from "../../../services/api/tutorService"
import { getStudentsCacheKey } from "../../../utils/cacheKeys"

export interface CreateTutorData {
    access: string
    tutor: TutorCreateUpdate
}

const useCreateTutor = (): UseMutationResult<Tutor, Error, CreateTutorData> => {
    const tutorService = getTutorService({})
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: CreateTutorData) => tutorService.post(data.tutor, data.access),
        onSuccess: res => {
            console.log('res', res)
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

export default useCreateTutor