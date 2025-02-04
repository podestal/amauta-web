import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getEmergencyContactService, { EmergencyContact, EmergencyContactCreateUpdate } from "../../../../services/api/emergencyContact"
import { getStudentsCacheKey } from "../../../../utils/cacheKeys"

export interface UpdateEmergencyContactData {
    access: string
    emergencyContact: EmergencyContactCreateUpdate
}

interface Props {
    studentId?: string
    emergencyContactId: string
}

const useUpdateEmergencyContact = ({ studentId, emergencyContactId }: Props): UseMutationResult<EmergencyContact, Error, UpdateEmergencyContactData> => {
    const queryClient = useQueryClient()
    const emergencyContactService = getEmergencyContactService({ emergencyContactId })
    console.log('studentId', studentId)
    
    return useMutation({
        mutationFn: (data: UpdateEmergencyContactData) => emergencyContactService.update(data.emergencyContact, data.access),
        onSuccess: res => {
            console.log('res',res)
            queryClient.invalidateQueries({ queryKey: getStudentsCacheKey(('all')) })
        },
        onError: err => {
            console.log(err)
        }
    })
}

export default useUpdateEmergencyContact


