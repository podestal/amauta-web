import APIClient from "./apiClient"

export interface Attendance {
    id: number
    student: number
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
}

const getAttendanceService = ({ attendanceId }: Props) => {
    const url = attendanceId ? `atendance/${attendanceId}/` : `atendance/`
    return new APIClient<Attendance, AttendanceCreateUpdate>(url)
}

export default getAttendanceService

