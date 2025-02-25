import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getBirthInfoService, { BirthInfo, BirthInfoCreateUpdate } from "../../../../services/api/birthInfo"
import moment from "moment"

export interface UpdateBirthInfoData {
    access: string
    birthInfo: BirthInfoCreateUpdate
}

interface Props {
    studentId?: string
    birthInfoId: string
    classroomId: string
    studentDni?: string
    studentName?: string
}

const useUpdateBirthInfo = ({ studentId, birthInfoId, classroomId, studentDni, studentName }: Props): UseMutationResult<BirthInfo, Error, UpdateBirthInfoData> => {
    const queryClient = useQueryClient()
    const birthInfoService = getBirthInfoService({ birthInfoId })
    console.log('studentId', studentId)
    const day = moment().date().toString()
    const month = moment().month().toString()
    
    return useMutation({
        mutationFn: (data: UpdateBirthInfoData) => birthInfoService.update(data.birthInfo, data.access),
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

export default useUpdateBirthInfo