import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getAssignatureGradeService, { AssignatureGrade, CreateUpdateAssignatureGrade } from "../../../services/api/assignatureGrade"

export interface UpdateAssignatureGradeData {
    access: string
    assignatureGrade: CreateUpdateAssignatureGrade
}

interface Props {
    assignatureGradeId: number
    cacheKey?: string[]
}
const useUpdateAssignatureGrade = ({ cacheKey, assignatureGradeId }: Props): UseMutationResult<AssignatureGrade, Error, UpdateAssignatureGradeData> => {
    const queryClient = useQueryClient()
    const assignatureGradeService = getAssignatureGradeService({assignatureGradeId})

    return useMutation({
        mutationFn: (data: UpdateAssignatureGradeData) => assignatureGradeService.update(data.assignatureGrade, data.access),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cacheKey })
        },
    })
}
export default useUpdateAssignatureGrade