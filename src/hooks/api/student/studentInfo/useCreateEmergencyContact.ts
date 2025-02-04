import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getEmergencyContactService, {EmergencyContact, EmergencyContactCreateUpdate} from "../../../../services/api/emergencyContact"
import { getStudentsCacheKey } from "../../../../utils/cacheKeys"

export interface CreateEmergencyContactData {
    access: string
    emergencyContact: EmergencyContactCreateUpdate
}

const useCreateEmergencyContact = (): UseMutationResult<EmergencyContact, Error, CreateEmergencyContactData> => {
    const queryClient = useQueryClient()
    const emergencyContactService = getEmergencyContactService({})
    return useMutation({
        mutationFn: (data: CreateEmergencyContactData) => emergencyContactService.post(data.emergencyContact, data.access),
        onSuccess: res => {
            console.log('res',res)
            queryClient.invalidateQueries({ queryKey: getStudentsCacheKey(('all')) })
        },
        onError: err => {
            console.log(err)
        }
    })
}

export default useCreateEmergencyContact