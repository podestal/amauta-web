import APIClient from "./apiClient"

export interface TutorContacted {
    id: number
    student: number
    contact_date: Date
    created_by: number
}

export type CreateTutorContacted = Omit<TutorContacted, 'id' | 'contact_date'>

const tutorContactedService = new APIClient<TutorContacted, CreateTutorContacted>('tutor-contact/')

export default tutorContactedService