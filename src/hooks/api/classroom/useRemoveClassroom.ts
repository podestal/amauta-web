import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getClassroomService, { Classroom } from "../../../services/api/classroomService"

interface RemoveClassroomData {
    access: string
}

interface Props {
    classroomId: string
    school: string
}

const useRemoveClassroom = ({ classroomId, school }: Props): UseMutationResult<Classroom, Error, RemoveClassroomData> => {
    const classroomService = getClassroomService({ classroomId })
    const queryClient = useQueryClient()
    const params = { school }
    return useMutation({
        mutationFn: (data: RemoveClassroomData) => classroomService.delete(data.access, params),
        onSuccess: res => {
            // queryClient.setQueryData<Classroom[]>(['classroom'], (oldData) => {
            //     return oldData?.filter((classroom) => classroom.id !== res.id)
            // })
            console.log(res)
            queryClient.invalidateQueries({ queryKey: ['classroom'] })
        },
        onError: err => {
            console.log(err)
        }
    })
}

export default useRemoveClassroom