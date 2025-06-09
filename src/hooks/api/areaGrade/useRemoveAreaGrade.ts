import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getAreaGradeService, { AreaGrade } from "../../../services/api/areaGradeService"

interface RemoveAreaGradeData {
    access: string
}

interface Props {
    assignatures: string[]
    clase: string
    areaGradeId: number
    quarter: string
    areaId: number
}
const useRemoveAreaGrade = ({ assignatures, clase, areaGradeId, quarter, areaId }: Props): UseMutationResult<AreaGrade, Error, RemoveAreaGradeData> => {
    const areaGradeService = getAreaGradeService({ areaGradeId })
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: RemoveAreaGradeData) => areaGradeService.delete(data.access),
        onSuccess: res => {
            // Invalidate the cache for the query key
            console.log(res);
            
            queryClient.invalidateQueries({ queryKey: ['students', assignatures, clase, quarter, (areaId).toString()] })
        },
        onError: (error) => {
            console.error("Error removing area grade:", error)
        },
    })
}
export default useRemoveAreaGrade