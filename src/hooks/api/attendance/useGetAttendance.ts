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
    // const ATTENDANCE_CACHE_KEY = getAttendanceCacheKey({ classroomId, studentId, month })
    const attendanceService = getAttendanceService({ classroomId, studentId })

    let attendanceCacheKey = ['']

    if (classroomId) {
        if (week) {
            attendanceCacheKey = getAttendanceCacheKey({ classroomId, time: week })
        }
        if (day) {
            attendanceCacheKey = getAttendanceCacheKey({ classroomId, time: `${day} ${month}` })
        }
    } else if (studentId) {
        attendanceCacheKey = getAttendanceCacheKey({ studentId, month })
    }

    // let params = {}
    // if (classroomId) {
    //     if (week) {
    //         params = { classroom: classroomId, week }
    //     } else if (day) {
    //         params = { classroom: classroomId, day, month}
    //     }
    //     else {
    //         params = { classroom: classroomId, month }
    //     }
    // } else if (studentId) {
    //     params = { student: studentId, month }
    // }
    console.log('week', week)
    console.log('day', day)
    console.log('month', month)
    
    
    
    console.log('attendanceCacheKey', attendanceCacheKey);
    
    let params: { classroom: string; day?: string; month?: string; week?: string } = { classroom: classroomId || '' }

    if (day) params = {...params, day: day}
    if (month) params = {...params, month: month}
    if (week) params = {...params, week: week}

    // return useQuery({
    //     queryKey: STUDENT_CACHE_KEY,
    //     queryFn: () => classroomId ? studentService.get(access, params) : studentService.get(access),
    // })

    return useQuery({
        queryKey: attendanceCacheKey,
        queryFn: () => attendanceService.get(access, params),
    })
}

export default useGetAttendance
