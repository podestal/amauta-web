import APIClient from "./apiClient"

export interface Instructor {
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

const getInstructorService = ({ me }: Props) => {
    let url = 'instructor/'
    if (me) {
        url = 'instructor/me/'
    }
    return new APIClient<Instructor>(url)
}

export default getInstructorService