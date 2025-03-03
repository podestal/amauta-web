import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getQuarterGradeService, { QuarterGrade, QuarterGradeCreateUpdate } from "../../../services/api/quarterGradeService"

interface CreateQuarterGradeData {
    access: string
    quarterGrade: QuarterGradeCreateUpdate
}

interface Props {
    updateCacheKey?: string[]
}

const useCreateQuarterGrade = ({ updateCacheKey }: Props): UseMutationResult<QuarterGrade, Error, CreateQuarterGradeData> => {
    const quarterGradeService = getQuarterGradeService({})
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: (data: CreateQuarterGradeData) => quarterGradeService.post(data.quarterGrade, data.access),
        onSuccess: res => {
            console.log(res)
            updateCacheKey && queryClient.invalidateQueries({ queryKey: updateCacheKey })
        },
        onError: err => {
            console.log(err)
        }
    })
}

export default useCreateQuarterGrade
