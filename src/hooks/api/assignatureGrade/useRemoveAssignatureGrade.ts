import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getAssignatureGradeService, { AssignatureGrade } from "../../../services/api/assignatureGrade"

interface RemoveAssignatureGradeData {
    access: string
}

interface Props {
    queryKey: string[]
    assignatureGradeId: number
}

const useRemoveAssignatureGrade = ({ queryKey, assignatureGradeId }: Props): UseMutationResult<AssignatureGrade, Error, RemoveAssignatureGradeData> => {
    const assignatureGradeService = getAssignatureGradeService({ assignatureGradeId })
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: RemoveAssignatureGradeData) => assignatureGradeService.delete(data.access),
        onSuccess: () => {
            // Invalidate the cache for the query key
            queryClient.invalidateQueries({ queryKey })
        },
        onError: (error) => {
            console.error("Error removing assignature grade:", error)
        },
    })
}
export default useRemoveAssignatureGrade