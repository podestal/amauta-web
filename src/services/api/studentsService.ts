import APIClient from "./apiClient"

export interface Student {
    id: number
    first_name: string
    last_name: string
    uid: string
    attendance: string | null
}

export default new APIClient<Student>('student/byClassroom/')