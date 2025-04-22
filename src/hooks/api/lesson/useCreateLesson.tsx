import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getLessonService, { Lesson, CreateUpdateLesson } from "../../../services/api/lessonService"

export interface CreateLessonData {
    access: string
    lesson: CreateUpdateLesson
}

const useCreateLesson = (): UseMutationResult<Lesson, Error, CreateLessonData> => {
    const lessonService = getLessonService({})
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: CreateLessonData) => lessonService.post(data.lesson, data.access),
        onSuccess: res => {
            queryClient.setQueryData<Lesson[]>(['lessons'], (oldData) => {
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