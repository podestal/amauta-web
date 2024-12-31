import APIClient from "./apiClient"

export interface SimpleAttendance {
    id: number
    status: string
}

export interface Student {
    id: number
    first_name: string
    last_name: string
    uid: string
    attendance: SimpleAttendance | null
}

export default new APIClient<Student>('student/byClassroom/')