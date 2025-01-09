import APIClient from "./apiClient"

export interface Instructor {
    id: number
    user: number
    clases_details: string[]
    first_name: string
    last_name: string
}

const instructorService = new APIClient<Instructor>('instructor/me/')

export default instructorService