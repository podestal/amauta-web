import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getHealthInfoService, { HealthInfo, HealthInfoCreateUpdate } from "../../../../services/api/healthInfo"
import moment from "moment"

export interface UpdateHealthInfoData {
    access: string
    healthInfo: HealthInfoCreateUpdate
}

interface Props {
    studentId?: string
    healthInfoId: string
    classroomId: string
    studentDni?: string
    studentName?: string
}

const useUpdateHealthInfo = ({ studentId, healthInfoId, classroomId, studentDni, studentName }: Props): UseMutationResult<HealthInfo, Error, UpdateHealthInfoData> => {
    const queryClient = useQueryClient()
    const healthInfoService = getHealthInfoService({ healthInfoId })
    console.log('studentId', studentId)
    const day = moment().date().toString()
    const month = moment().month().toString()
    
    return useMutation({
        mutationFn: (data: UpdateHealthInfoData) => healthInfoService.update(data.healthInfo, data.access),
        onSuccess: res => {
            console.log('res',res)
            studentDni && queryClient.invalidateQueries({ queryKey: [`student ${studentDni}`] })
            studentName && queryClient.invalidateQueries({ queryKey: [`students ${studentName}`] })
            queryClient.invalidateQueries({ queryKey: [`students ${classroomId} ${day} ${month}`] })
            queryClient.invalidateQueries({ queryKey: [`students last ten`] })
        },
        onError: err => {
            console.log(err)
        }
    })
}

export default useUpdateHealthInfo