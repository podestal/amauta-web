import APIClient from "./apiClient"

export interface Instructor {
    id: number
    user: number
    clases_details: string[]
    first_name: string
    last_name: string
    school: number
    clases?: number[]
}

type CreateUpdateInstructor = Omit<Instructor, 'id' | 'clases_details'>

interface Props {
    me?: boolean
}

const getInstructorService = ({ me }: Props) => {
    let url = 'instructor/'
    if (me) {
        url = 'instructor/me/'
    }
    return new APIClient<Instructor, CreateUpdateInstructor>(url)
}

export default getInstructorService