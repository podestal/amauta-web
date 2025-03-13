import APIClient from "./apiClient"

export interface Classroom {
    id: number
    level: string
    section: string
    grade: string
    total_students: number
    missing_dni: number
}

export type CreateClassroom = Omit<Classroom, 'id' | 'total_students' | 'missing_dni'> & {
    school: number
}

const getClassroomService = () => {
    const url = 'clase/'
    return new APIClient<Classroom, CreateClassroom>(url)
}

export default getClassroomService