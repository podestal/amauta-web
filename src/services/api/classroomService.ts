import APIClient from "./apiClient"

export interface Classroom {
    id: number
    grade: string
    level: string
    section: string
}

export default new APIClient<Classroom>('clase/')