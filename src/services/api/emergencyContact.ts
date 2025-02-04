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

interface Props {
    emergencyContactId?: string
}

const getEmergencyContactService = ({ emergencyContactId }: Props) => {
    const url = emergencyContactId ? `emergency-contact/${emergencyContactId}/` : 'emergency-contact/'
    return new APIClient<EmergencyContact, EmergencyContactCreateUpdate>(url)
}

export default getEmergencyContactService