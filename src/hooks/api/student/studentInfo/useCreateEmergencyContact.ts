import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getEmergencyContactService, {EmergencyContact, EmergencyContactCreateUpdate} from "../../../../services/api/emergencyContact"
import moment from "moment"

export interface CreateEmergencyContactData {
    access: string
    emergencyContact: EmergencyContactCreateUpdate
}

interface Props {
    classroomId: string
    studentDni?: string
    studentName?: string
}

const useCreateEmergencyContact = ({ classroomId, studentDni, studentName }: Props): UseMutationResult<EmergencyContact, Error, CreateEmergencyContactData> => {
    const queryClient = useQueryClient()
    const emergencyContactService = getEmergencyContactService({})
    const day = moment().date().toString()
    const month = moment().month().toString()
    return useMutation({
        mutationFn: (data: CreateEmergencyContactData) => emergencyContactService.post(data.emergencyContact, data.access),
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

export default useCreateEmergencyContact