import APIClient from "./apiClient"

export interface Classroom {
    id: number
    level: string
    section: string
    grade: string
}

const getClassroomService = () => {
    const url = 'clase/'
    return new APIClient<Classroom>(url)
}

export default getClassroomService