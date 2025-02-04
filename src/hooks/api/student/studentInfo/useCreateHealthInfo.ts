import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getHealthInfoService, { HealthInfo, HealthInfoCreateUpdate } from "../../../../services/api/healthInfo"
import { getStudentsCacheKey } from "../../../../utils/cacheKeys"

export interface CreateHealthInfoData {
    access: string
    healthInfo: HealthInfoCreateUpdate
}

const useCreateHealthInfo = (): UseMutationResult<HealthInfo, Error, CreateHealthInfoData> => {
    const queryClient = useQueryClient()
    const healthInfoService = getHealthInfoService({})
    return useMutation({
        mutationFn: (data: CreateHealthInfoData) => healthInfoService.post(data.healthInfo, data.access),
        onSuccess: res => {
            console.log('res',res)
            queryClient.invalidateQueries({ queryKey: getStudentsCacheKey(('all')) })
        },
        onError: err => {
            console.log(err)
        }
    })
}

export default useCreateHealthInfo