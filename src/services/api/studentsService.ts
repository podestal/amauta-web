import APIClient from "./apiClient"

export interface SimpleAttendance {
    id: number
    status: string
    observations: string
}

export interface Student {
    uid: string
    first_name: string
    last_name: string
    attendance: SimpleAttendance | null
}

export default new APIClient<Student>('student/byClassroom/')