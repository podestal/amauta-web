import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getAssignatureGradeService, {AssignatureGrade, CreateUpdateAssignatureGrade} from "../../../services/api/assignatureGrade"

interface CreateAssignatureGradeData {
    access: string
    assignatureGrade: CreateUpdateAssignatureGrade
}

interface Props {
    cacheKey?: string[]
}

const useCreateAssignatureGrade = ({ cacheKey }: Props): UseMutationResult<AssignatureGrade, Error, CreateAssignatureGradeData> => {
    const queryClient = useQueryClient()
    const assignatureGradeService = getAssignatureGradeService({})

    return useMutation({
        mutationFn: (data: CreateAssignatureGradeData) => assignatureGradeService.post(data.assignatureGrade, data.access),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cacheKey })
        },
    })
}
export default useCreateAssignatureGrade