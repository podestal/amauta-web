import { UseQueryResult, useQuery } from "@tanstack/react-query"
import getAttendanceService, { Attendance } from "../../../services/api/attendanceService"
import {getAttendanceCacheKey} from "../../../utils/cacheKeys"

interface Props {
    access: string
    classroomId?: string
    studentId?: string
}

const useGetAttendance = ({ access, classroomId, studentId }: Props): UseQueryResult<Attendance[], Error> => {
    const ATTENDANCE_CACHE_KEY = getAttendanceCacheKey({ classroomId, studentId })
    const attendanceService = getAttendanceService({ classroomId, studentId })

    let params = {}
    if (classroomId) {
        params = { classroom: classroomId }
    } else if (studentId) {
        params = { student: studentId }
    }

    return useQuery({
        queryKey: ATTENDANCE_CACHE_KEY,
        queryFn: () => attendanceService.get(access, params),
    })
}

export default useGetAttendance
