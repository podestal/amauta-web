import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getEmergencyContactService, { EmergencyContact, EmergencyContactCreateUpdate } from "../../../../services/api/emergencyContact"
import moment from "moment"

export interface UpdateEmergencyContactData {
    access: string
    emergencyContact: EmergencyContactCreateUpdate
}

interface Props {
    studentId?: string
    emergencyContactId: string
    classroomId: string
}

const useUpdateEmergencyContact = ({ studentId, emergencyContactId, classroomId }: Props): UseMutationResult<EmergencyContact, Error, UpdateEmergencyContactData> => {
    const queryClient = useQueryClient()
    const emergencyContactService = getEmergencyContactService({ emergencyContactId })
    console.log('studentId', studentId)
    const day = moment().date().toString()
    const month = moment().month().toString()
    
    return useMutation({
        mutationFn: (data: UpdateEmergencyContactData) => emergencyContactService.update(data.emergencyContact, data.access),
        onSuccess: res => {
            console.log('res',res)
            queryClient.invalidateQueries({ queryKey: [`students ${classroomId} ${day} ${month}`] })
        },
        onError: err => {
            console.log(err)
        }
    })
}

export default useUpdateEmergencyContact


