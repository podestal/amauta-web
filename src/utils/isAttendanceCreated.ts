import { Attendance } from "../services/api/attendanceService"

export const isAttendanceCreated = (attendances: Attendance[], studentUid: string) => {    
    return attendances.some(attendance => (attendance.student).toString() === studentUid)
}