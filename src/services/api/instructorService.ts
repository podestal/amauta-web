import APIClient from "./apiClient"

export interface Instructor {
    id: number
    user: number
    clases_details: string[]
    first_name: string
    last_name: string
}

export default new APIClient<Instructor>('instructor/me/')