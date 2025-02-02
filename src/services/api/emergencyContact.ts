import APIClient from "./apiClient"

// student = models.OneToOneField(Student, on_delete=models.CASCADE, related_name="emergency_contact")
// name = models.CharField(max_length=255)
// phone_number = models.CharField(max_length=255)
// address = models.TextField()

export interface EmergencyContact {
    id: string
    name: string
    phone_number: string
    address: string
}

export type EmergencyContactCreateUpdate = Omit<EmergencyContact, 'id'>

export default new APIClient<EmergencyContact, EmergencyContactCreateUpdate>('emergency-contact/')