import APIClient from "./apiClient"
import { Classroom } from "./classroomService"

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
    attendances: SimpleAttendance[]
    clase: Classroom
}

interface Props {
    tutor?: boolean
}

const getStudentService = ({ tutor }: Props) => {
    const URL = tutor ? `student/byTutor/` : `student/byClassroom/`
    return new APIClient<Student>(URL)
}
export default getStudentService