import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getBirthInfoService, { BirthInfo, BirthInfoCreateUpdate } from "../../../../services/api/birthInfo"
import { getStudentsCacheKey } from "../../../../utils/cacheKeys"

export interface CreateBirthInfoData {
    access: string
    birthInfo: BirthInfoCreateUpdate
}

const useCreateBirthInfo = (): UseMutationResult<BirthInfo, Error, CreateBirthInfoData> => {

    const birthInfoService = getBirthInfoService({})
    
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: CreateBirthInfoData) => birthInfoService.post(data.birthInfo, data.access),
        onSuccess: res => {
            console.log('res',res)
            queryClient.invalidateQueries({ queryKey: getStudentsCacheKey(('all')) })
        },
        onError: err => {
            console.log(err)
        }
    })
}

export default useCreateBirthInfo