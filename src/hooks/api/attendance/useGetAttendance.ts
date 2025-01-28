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

const useGetAttendance = ({ access, classroomId, studentId, month, week, day }: Props): UseQueryResult<Attendance[], Error> => {

    const attendanceService = getAttendanceService({ classroomId, studentId })

    let attendanceCacheKey = ['']

    if (classroomId) {
        console.log(month)
        
        if (week) {
            attendanceCacheKey = getAttendanceCacheKey({ classroomId, time: week })
        }
        if (day) {
            attendanceCacheKey = getAttendanceCacheKey({ classroomId, time: `${day} ${month}` })
        }
        if (month) {
            attendanceCacheKey = getAttendanceCacheKey({ classroomId, time: month })
        }
    } else if (studentId) {
        attendanceCacheKey = getAttendanceCacheKey({ studentId, month })
    }

    
    
    console.log('attendanceCacheKey', attendanceCacheKey);
    
    let params: { classroom: string; day?: string; month?: string; week?: string } = { classroom: classroomId || '' }

    if (day) params = {...params, day: day}
    if (month) params = {...params, month: month}
    if (week) params = {...params, week: week}

    // return useQuery({
    //     queryKey: STUDENT_CACHE_KEY,
    //     queryFn: () => classroomId ? studentService.get(access, params) : studentService.get(access),
    // })

    console.log('params', params);
    

    return useQuery({
        queryKey: attendanceCacheKey,
        queryFn: () => attendanceService.get(access, params),
    })
}

export default useGetAttendance
