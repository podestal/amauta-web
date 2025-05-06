import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"
import getLessonService, { Lesson, CreateUpdateLesson } from "../../../services/api/lessonService"

export interface UpdateLessonData {
    access: string
    lesson: CreateUpdateLesson
}

interface Props {
    assignatureId: string
    quarter: string
    lessonId: string
}

const useUpdateLesson = ({ assignatureId, quarter, lessonId }: Props): UseMutationResult<Lesson, Error, UpdateLessonData> => {
    const lessonService = getLessonService({id: lessonId})
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: UpdateLessonData) => lessonService.update(data.lesson, data.access),
        onSuccess: res => {
            queryClient.setQueryData<Lesson[]>([`lessons ${assignatureId} ${quarter}`], (oldData) => {
                if (!oldData) return [res]
                return oldData.map(lesson => lesson.id === res.id ? res : lesson)
            })
        },
        onError: err => {
            console.log(err)
        }
    })
}

export default useUpdateLesson