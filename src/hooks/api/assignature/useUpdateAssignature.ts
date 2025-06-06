import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getAssignatureService, { Assignature, CreateUpdateAssignature } from "../../../services/api/assignatureService"


export interface UpdateAssignatureData {
    access: string
    assignatureUpdates: CreateUpdateAssignature
}

interface Props {
    assignatureId: number
    classroomId: number
}

const useUpdateAssignature = ({ assignatureId, classroomId }: Props): UseMutationResult<Assignature, Error, UpdateAssignatureData> => {
    const assignatureService = getAssignatureService({ assignatureId })
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ( data: UpdateAssignatureData ) => assignatureService.update( data.assignatureUpdates, data.access),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['assignatures', classroomId]})
        },
        onError: err => {
            // Handle error, e.g., show notification or log error
            console.error("Error updating assignature:", err)
        }
    })
}
export default useUpdateAssignature