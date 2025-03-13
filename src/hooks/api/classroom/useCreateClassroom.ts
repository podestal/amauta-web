import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getClassroomService, { Classroom, CreateClassroom } from "../../../services/api/classroomService"

export interface CreateClassroomData {
    access: string
    classroom: CreateClassroom
}

const useCreateClassroom = (): UseMutationResult<Classroom, Error, CreateClassroomData> => {
    const classroomService = getClassroomService()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: CreateClassroomData) => classroomService.post(data.classroom, data.access),
        onSuccess: res => {
            queryClient.setQueryData<Classroom[]>(['classroom'], (oldData) => {
                if (!oldData) return [res]
                return [...oldData, res]
            })
        },
        onError: err => {
            console.log(err)
        }
    })
}

export default useCreateClassroom
