import APIClient from "./apiClient"

export interface Admin {
    id: number
    user: number
    clases_details: string[]
    first_name: string
    last_name: string
    school: number
}

interface Props {
    me?: boolean
}

const getAdminService = ({ me }: Props) => {
    let url = 'admin/'
    if (me) {
        url = 'admin/me/'
    }
    return new APIClient<Admin>(url)
}

export default getAdminService