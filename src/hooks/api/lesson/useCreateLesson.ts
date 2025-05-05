import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getLessonService, { Lesson, CreateUpdateLesson } from "../../../services/api/lessonService"

export interface CreateLessonData {
    access: string
    lesson: CreateUpdateLesson
}

interface Props {
    assignatureId: string
    quarter: string
}

const useCreateLesson = ({ assignatureId, quarter }: Props): UseMutationResult<Lesson, Error, CreateLessonData> => {
    
    const lessonService = getLessonService({})
    console.log('quarter in create lesson', quarter);
    
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: CreateLessonData) => lessonService.post(data.lesson, data.access),
        onSuccess: res => {
            queryClient.setQueryData<Lesson[]>([`lessons ${assignatureId} ${quarter}`], (oldData) => {
                if (!oldData) return [res]
                return [...oldData, res]
            })
        },
        onError: err => {
            console.log(err)
        }
    })
}
export default useCreateLesson