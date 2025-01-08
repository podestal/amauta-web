import APIClient from "./apiClient"

export interface Tutor {
    id: number
    students: number[]
    first_name: string
    last_name: string
    phone_number: string
    address: string
    email: string
    can_access: boolean
}

const tutorService = new APIClient<Tutor>('tutor/me/')

export default tutorService