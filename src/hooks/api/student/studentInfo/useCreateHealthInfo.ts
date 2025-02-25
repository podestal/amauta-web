import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getHealthInfoService, { HealthInfo, HealthInfoCreateUpdate } from "../../../../services/api/healthInfo"
import moment from "moment"

export interface CreateHealthInfoData {
    access: string
    healthInfo: HealthInfoCreateUpdate
}

interface Props {
    classroomId: string
    studentDni?: string
    studentName?: string
}

const useCreateHealthInfo = ({ classroomId, studentDni, studentName }: Props): UseMutationResult<HealthInfo, Error, CreateHealthInfoData> => {
    const queryClient = useQueryClient()
    const healthInfoService = getHealthInfoService({})
    const day = moment().date().toString()
    const month = moment().month().toString()
    return useMutation({
        mutationFn: (data: CreateHealthInfoData) => healthInfoService.post(data.healthInfo, data.access),
        onSuccess: res => {
            console.log('res',res)
            studentDni && queryClient.invalidateQueries({ queryKey: [`student ${studentDni}`] })
            studentName && queryClient.invalidateQueries({ queryKey: [`students ${studentName}`] })
            queryClient.invalidateQueries({ queryKey: [`students ${classroomId} ${day} ${month}`] })
        },
        onError: err => {
            console.log(err)
        }
    })
}

export default useCreateHealthInfo