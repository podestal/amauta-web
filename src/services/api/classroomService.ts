import APIClient from "./apiClient"

export interface Classroom {
    id: number
    grade: string
    level: string
    section: string
    total_students: number
    missing_dni: number
}

export default new APIClient<Classroom>('clase/')