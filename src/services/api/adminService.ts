import APIClient from "./apiClient"

export interface Admin {
    id: number
    user: number
    clases_details: string[]
    first_name: string
    last_name: string
    school: number
    phone_number?: string
    email?: string
    clases?: number[]
}

interface Props {
    me?: boolean
}

const getAdminService = ({ me }: Props) => {
    let url = 'manager/'
    if (me) {
        url = 'manager/me/'
    }
    return new APIClient<Admin>(url)
}

export default getAdminService