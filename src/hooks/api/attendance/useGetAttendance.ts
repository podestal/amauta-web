import { UseQueryResult, useQuery } from "@tanstack/react-query"
import getAttendanceService, { Attendance } from "../../../services/api/attendanceService"
import {getAttendanceCacheKey} from "../../../utils/cacheKeys"

interface Props {
    access: string
    classroomId?: string
    studentId?: string
    month?: string
    day?: string
    week?: string
}

const useGetAttendance = ({ access, classroomId, studentId, month, week }: Props): UseQueryResult<Attendance[], Error> => {
    const ATTENDANCE_CACHE_KEY = getAttendanceCacheKey({ classroomId, studentId, month, week })
    const attendanceService = getAttendanceService({ classroomId, studentId })

    let params = {}
    if (classroomId) {
        params = { classroom: classroomId, week }
    } else if (studentId) {
        params = { student: studentId, month }
    }

    return useQuery({
        queryKey: ATTENDANCE_CACHE_KEY,
        queryFn: () => attendanceService.get(access, params),
    })
}

export default useGetAttendance
