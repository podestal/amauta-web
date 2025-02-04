import APIClient from "./apiClient"

export interface EmergencyContact {
    id: string
    name: string
    phone_number: string
    address: string
}

export type EmergencyContactCreateUpdate = Omit<EmergencyContact, 'id'> & {
    student: string
}

const emergencyContactService = new APIClient<EmergencyContact, EmergencyContactCreateUpdate>('emergency-contact/')

export default emergencyContactService