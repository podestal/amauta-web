import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getAreaGradeService, {AreaGrade, CreateUpdateAreaGrade} from "../../../services/api/areaGradeService"

interface CreateAreaGradeData {
    access: string
    areaGrade: CreateUpdateAreaGrade
}

const useCreateAreaGrade = (): UseMutationResult<AreaGrade, Error, CreateAreaGradeData> => {
    const queryClient = useQueryClient()
    const areaGradeService = getAreaGradeService({})

    return useMutation({
        mutationFn: ( data: CreateAreaGradeData) => areaGradeService.post(data.areaGrade, data.access),
        onSuccess: res => {
            console.log('res:', res);
            
        },
        onError: (error) => {
            console.error('Error creating area grade:', error);
        },
    })
}

export default useCreateAreaGrade