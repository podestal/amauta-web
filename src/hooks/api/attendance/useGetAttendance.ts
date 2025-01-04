import { UseQueryResult, useQuery } from "@tanstack/react-query"
import getAttendanceService, { Attendance } from "../../../services/api/attendanceService"
import {getAttendanceCacheKey} from "../../../utils/cacheKeys"

interface Props {
    access: string
    classroomId: string
}

const useGetAttendance = ({ access, classroomId }: Props): UseQueryResult<Attendance[], Error> => {
    const ATTENDANCE_CACHE_KEY = getAttendanceCacheKey(classroomId)
    const attendanceService = getAttendanceService({ classroomId })
    const params = {
        classroom: classroomId
    }

    return useQuery({
        queryKey: ATTENDANCE_CACHE_KEY,
        queryFn: () => attendanceService.get(access, params),
    })
}

export default useGetAttendance
