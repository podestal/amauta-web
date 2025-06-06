import { UseMutationResult, useMutation } from "@tanstack/react-query"
import getAssignatureService, { Assignature, CreateUpdateAssignature } from "../../../services/api/assignatureService"


export interface UpdateAssignatureData {
    access: string
    assignatureUpdates: CreateUpdateAssignature
}

interface Props {
    assignatureId: number
}

const useUpdateAssignature = ({ assignatureId }: Props): UseMutationResult<Assignature, Error, UpdateAssignatureData> => {
    const assignatureService = getAssignatureService({ assignatureId })

    return useMutation({
        mutationFn: ( data: UpdateAssignatureData ) => assignatureService.update( data.assignatureUpdates, data.access),
        onSuccess: res => {
            // Optionally handle success, e.g., update cache or notify user
            console.log("Assignature updated successfully:", res)
        },
        onError: err => {
            // Handle error, e.g., show notification or log error
            console.error("Error updating assignature:", err)
        }
    })
}
export default useUpdateAssignature