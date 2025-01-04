import APIClient from "./apiClient"

export interface Attendance {
    id: number
    student: string
    status: string
    observations: string
    created_by: string
    created_at: Date
    updated_at: Date
}

export type AttendanceCreateUpdate = Omit<Attendance, 'id' | 'created_at' | 'updated_at' | 'observations'> & {
    observations?: string
}

interface Props {
    attendanceId?: number
    classroomId?: string
}

const getAttendanceService = ({ attendanceId, classroomId }: Props) => {
    let url = 'atendance/'
    if (attendanceId) url += `${attendanceId}/`
    if (classroomId) url += `byClassroom/`
    return new APIClient<Attendance, AttendanceCreateUpdate>(url)
}

export default getAttendanceService
