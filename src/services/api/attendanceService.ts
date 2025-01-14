import APIClient from "./apiClient"

export interface Attendance {
    id: number
    student: string
    status: string
    observations: string
    created_by: string
    created_at: Date
    updated_at: Date
    attendance_type: 'M' | 'A' 
}

export type AttendanceCreateUpdate = Omit<Attendance, 'id' | 'created_at' | 'updated_at' | 'observations'> & {
    observations?: string
}

interface Props {
    attendanceId?: number
    classroomId?: string
    studentId?: string
}

const getAttendanceService = ({ attendanceId, classroomId, studentId }: Props) => {
    let url = 'atendance/'
    
    if (attendanceId) url += `${attendanceId}/`
    if (classroomId) url += `byClassroom/`
    if (studentId) url += `byStudent/`
    return new APIClient<Attendance, AttendanceCreateUpdate>(url)
}

export default getAttendanceService
