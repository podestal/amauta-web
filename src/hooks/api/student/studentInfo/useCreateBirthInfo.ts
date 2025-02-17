import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getBirthInfoService, { BirthInfo, BirthInfoCreateUpdate } from "../../../../services/api/birthInfo"
import moment from "moment"

export interface CreateBirthInfoData {
    access: string
    birthInfo: BirthInfoCreateUpdate
}

interface Props {
    classroomId: string
}

const useCreateBirthInfo = ({ classroomId }: Props): UseMutationResult<BirthInfo, Error, CreateBirthInfoData> => {

    const birthInfoService = getBirthInfoService({})
    const day = moment().date().toString()
    const month = moment().month().toString()
    
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: CreateBirthInfoData) => birthInfoService.post(data.birthInfo, data.access),
        onSuccess: res => {
            console.log('res',res)
            queryClient.invalidateQueries({ queryKey: [`students ${classroomId} ${day} ${month}`] })
        },
        onError: err => {
            console.log(err)
        }
    })
}

export default useCreateBirthInfo