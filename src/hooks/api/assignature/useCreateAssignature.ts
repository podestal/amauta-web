import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getAssignatureService, { Assignature , CreateUpdateAssignature} from "../../../services/api/assignatureService"

export interface CreateAssignatureData {
    access: string
    assignature: CreateUpdateAssignature
}

const useCreateAssignature = (): UseMutationResult<Assignature, Error, CreateAssignatureData> => {
    const assignatureService = getAssignatureService({})
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: (data: CreateAssignatureData) => assignatureService.post(data.assignature, data.access),
        onSuccess: res => {
            queryClient.setQueryData<Assignature[]>(['assignatures'], (oldData) => {
                if (!oldData) return [res]
                return [...oldData, res]
            })
        },
        onError: err => {
            console.log(err)
        }
    })
}
export default useCreateAssignature