import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getAreaGradeService, { AreaGrade, CreateUpdateAreaGrade } from "../../../services/api/areaGradeService"

interface UpdateAreaGradeData {
    access: string
    areaGrade: CreateUpdateAreaGrade
}

interface Props {
    assignatures: string[]
    clase: string
    areaGradeId?: number
}

const useUpdateAreaGrade = ({ assignatures, clase, areaGradeId }: Props): UseMutationResult<AreaGrade, Error, UpdateAreaGradeData> => {
    const queryClient = useQueryClient()
    const areaGradeService = getAreaGradeService({ areaGradeId })

    return useMutation({
        mutationFn: (data: UpdateAreaGradeData) => areaGradeService.update(data.areaGrade, data.access),
        onSuccess: res => {
            console.log('res:', res);
            queryClient.invalidateQueries({
                queryKey: ['students', assignatures, clase, res.quarter, (res.area).toString()],
            })
        },
        onError: (error) => {
            console.error('Error updating area grade:', error);
        },
    })
}

export default useUpdateAreaGrade