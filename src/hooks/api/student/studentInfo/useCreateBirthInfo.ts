import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getBirthInfoService, { BirthInfo, BirthInfoCreateUpdate } from "../../../../services/api/birthInfo"
import moment from "moment"

export interface CreateBirthInfoData {
    access: string
    birthInfo: BirthInfoCreateUpdate
}

interface Props {
    classroomId: string
    studentDni?: string
    studentName?: string
}

const useCreateBirthInfo = ({ classroomId, studentDni, studentName }: Props): UseMutationResult<BirthInfo, Error, CreateBirthInfoData> => {

    const birthInfoService = getBirthInfoService({})
    const day = moment().date().toString()
    const month = moment().month().toString()
    
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: CreateBirthInfoData) => birthInfoService.post(data.birthInfo, data.access),
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

export default useCreateBirthInfo