import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getQuarterGradeService, {QuarterGrade} from "../../../services/api/quarterGradeService"

export interface RemoveQuarterGradeData {
    access: string
}

interface Props {
    updateCacheKey?: string[]
    quarterGradeId: string
}

const useRemoveQuarterGrade = ({ updateCacheKey, quarterGradeId }: Props): UseMutationResult<QuarterGrade, Error, RemoveQuarterGradeData> => {
    const quarterGradeService = getQuarterGradeService({ quarterGradeId })
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: (data: RemoveQuarterGradeData) => quarterGradeService.delete(data.access),
        onSuccess: res => {
            console.log(res)
            updateCacheKey && queryClient.invalidateQueries({ queryKey: updateCacheKey })
        },
        onError: err => {
            console.log(err)
        },
    })
}

export default useRemoveQuarterGrade
