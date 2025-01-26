import APIClient from "./apiClient"
import { Classroom } from "./classroomService"

export interface SimpleAttendance {
    id: number
    status: 'N' | 'E' | 'L' | 'T' | 'O'
    observations: string
    created_at: Date
}

export interface Student {
    uid: string
    first_name: string
    last_name: string
    attendance: SimpleAttendance[] | null
    attendances_in: SimpleAttendance[]
    attendances_out: SimpleAttendance[]
    clase: Classroom
    picture: string
}

interface Props {
    tutor?: boolean
}

const getStudentService = ({ tutor }: Props) => {

    const URL = tutor ? `student/byTutor/` : `student/byClassroom/`
    return new APIClient<Student>(URL)

}
export default getStudentService