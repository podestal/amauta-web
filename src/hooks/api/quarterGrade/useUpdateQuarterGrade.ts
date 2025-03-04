import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getQuarterGradeService, { QuarterGrade, QuarterGradeCreateUpdate } from "../../../services/api/quarterGradeService"

export interface CreateQuarterGradeData {
    access: string
    quarterGrade: QuarterGradeCreateUpdate
}

interface Props {
    quarterGradeId: string
    updateCacheKey?: string[]
}

const useUpdateQuarterGrade = ({ quarterGradeId, updateCacheKey }: Props): UseMutationResult<QuarterGrade, Error, CreateQuarterGradeData> => {
    const quarterGradeService = getQuarterGradeService({ quarterGradeId })
    const queryClient = useQueryClient()
    console.log('quarterGradeId', quarterGradeId)
    console.log('updateCacheKey', updateCacheKey)
    
    return useMutation({
        mutationFn: (data: CreateQuarterGradeData) => quarterGradeService.update(data.quarterGrade, data.access),
        onSuccess: res => {
            console.log(res)
            updateCacheKey && queryClient.invalidateQueries({ queryKey: updateCacheKey })
        },
        onError: err => {
            console.log(err)
        },
    })
}

export default useUpdateQuarterGrade
