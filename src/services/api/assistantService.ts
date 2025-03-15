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
    school: number
    clases?: number[]
}

interface Props {
    me?: boolean
}

const getAssistantService = ({ me }: Props) => {
    let url = 'assistant/'
    if (me) {
        url = 'assistant/me/'
    }
    return new APIClient<Assistant>(url)
}

export default getAssistantService