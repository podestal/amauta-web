import APIClient from "./apiClient"

export interface Admin {
    id: number
    user: number
    clases_details: string[]
    first_name: string
    last_name: string
    school: number
}

const instructorService = new APIClient<Admin>('admin/me/')

export default instructorService