import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getLessonService, { Lesson, CreateUpdateLesson } from "../../../services/api/lessonService"

export interface CreateLessonData {
    access: string
    lesson: CreateUpdateLesson
}

interface Props {
    assignatureId: string
}

const useCreateLesson = ({ assignatureId }: Props): UseMutationResult<Lesson, Error, CreateLessonData> => {
    console.log('assignatureId', assignatureId);
    
    const lessonService = getLessonService({})
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: CreateLessonData) => lessonService.post(data.lesson, data.access),
        onSuccess: res => {
            queryClient.setQueryData<Lesson[]>([`lessons ${assignatureId}`], (oldData) => {
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