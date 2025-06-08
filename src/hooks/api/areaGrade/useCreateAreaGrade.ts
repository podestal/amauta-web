import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getAreaGradeService, {AreaGrade, CreateUpdateAreaGrade} from "../../../services/api/areaGradeService"

interface CreateAreaGradeData {
    access: string
    areaGrade: CreateUpdateAreaGrade
}

interface Props {
    assignatures: string[]
    clase: string
}

const useCreateAreaGrade = ({ assignatures, clase }: Props): UseMutationResult<AreaGrade, Error, CreateAreaGradeData> => {
    const queryClient = useQueryClient()
    const areaGradeService = getAreaGradeService({ areaGradeId: 0 }) // Assuming 0 is used for creating a new area grade

    return useMutation({
        mutationFn: ( data: CreateAreaGradeData) => areaGradeService.post(data.areaGrade, data.access),
        onSuccess: res => {
            console.log('res:', res);
            console.log('query key', ['students', assignatures, clase, res.quarter, (res.area).toString()])
            queryClient.invalidateQueries({
                queryKey: ['students', assignatures, clase, res.quarter, (res.area).toString()],
            })
        },
        onError: (error) => {
            console.error('Error creating area grade:', error);
        },
    })
}

export default useCreateAreaGrade