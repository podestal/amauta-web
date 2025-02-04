import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getHealthInfoService, { HealthInfo, HealthInfoCreateUpdate } from "../../../../services/api/healthInfo"
import { getStudentsCacheKey } from "../../../../utils/cacheKeys"

export interface UpdateHealthInfoData {
    access: string
    healthInfo: HealthInfoCreateUpdate
}

interface Props {
    studentId?: string
    healthInfoId: string
}

const useUpdateHealthInfo = ({ studentId, healthInfoId }: Props): UseMutationResult<HealthInfo, Error, UpdateHealthInfoData> => {
    const queryClient = useQueryClient()
    const healthInfoService = getHealthInfoService({ healthInfoId })
    console.log('studentId', studentId)
    
    return useMutation({
        mutationFn: (data: UpdateHealthInfoData) => healthInfoService.update(data.healthInfo, data.access),
        onSuccess: res => {
            console.log('res',res)
            queryClient.invalidateQueries({ queryKey: getStudentsCacheKey(('all')) })
        },
        onError: err => {
            console.log(err)
        }
    })
}

export default useUpdateHealthInfo