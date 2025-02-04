import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getBirthInfoService, { BirthInfo, BirthInfoCreateUpdate } from "../../../../services/api/birthInfo"
import { getStudentsCacheKey } from "../../../../utils/cacheKeys"

export interface UpdateBirthInfoData {
    access: string
    birthInfo: BirthInfoCreateUpdate
}

interface Props {
    studentId?: string
    birthInfoId: string
}

const useUpdateBirthInfo = ({ studentId, birthInfoId }: Props): UseMutationResult<BirthInfo, Error, UpdateBirthInfoData> => {
    const queryClient = useQueryClient()
    const birthInfoService = getBirthInfoService({ birthInfoId })
    console.log('studentId', studentId)
    
    return useMutation({
        mutationFn: (data: UpdateBirthInfoData) => birthInfoService.update(data.birthInfo, data.access),
        onSuccess: res => {
            console.log('res',res)
            queryClient.invalidateQueries({ queryKey: getStudentsCacheKey(('all')) })
        },
        onError: err => {
            console.log(err)
        }
    })
}

export default useUpdateBirthInfo