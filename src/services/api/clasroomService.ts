import APIClient from "./apiClient"

export interface Classroom {
    id: number
    level: string
    section: string
    grade: string
    total_students: number
    missing_dni: number
}

const getClassroomService = () => {
    const url = 'clase/'
    return new APIClient<Classroom>(url)
}

export default getClassroomService