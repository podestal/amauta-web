import APIClient from "./apiClient"

export interface Assistant {
    id: number
    user: number
    first_name: string
    last_name: string
    phone_number: string
    address: string
    email: string
    clases_details: string[]
}

const assistantService = new APIClient<Assistant>('assistant/me/')

export default assistantService