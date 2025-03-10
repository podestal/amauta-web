import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getAttendanceService, { Attendance, AttendanceCreateUpdate } from "../../../services/api/attendanceService"
import { getStudentsCacheKey } from "../../../utils/cacheKeys"
import { SimpleAttendance, Student } from "../../../services/api/studentsService"

export interface UpdateAttendanceData {
    access: string
    updates: AttendanceCreateUpdate
}

interface Props {
    attendanceId: number
    classroomId: string
}

const useUpdateAttendance = ({ attendanceId, classroomId }: Props): UseMutationResult<Attendance, Error, UpdateAttendanceData> => {
    
    const attendanceService = getAttendanceService({ attendanceId })
    const day = new Date().getDate().toString()
    const month = undefined
    const studentCacheKeyTime = `${classroomId} ${day} ${month}`
    const STUDENTS_CACHE_KEY = getStudentsCacheKey(studentCacheKeyTime)
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: UpdateAttendanceData) => attendanceService.update(data.updates, data.access),
        onSuccess: res => {
            console.log('STUDENT_CACHE_KEY', STUDENTS_CACHE_KEY)
            
            queryClient.setQueryData<Student[]>(STUDENTS_CACHE_KEY, (oldData) => {
                if (!oldData) return []
                const newData = oldData.map(student => {
                    if (student.uid === res.student) {
                        return {
                            ...student,
                            attendances_in: res.kind === 'I' ? [res as SimpleAttendance] : student.attendances_in, 
                            attendances_out: res.kind === 'O' ? [res as SimpleAttendance] : student.attendances_out
                        }
                    }
                    return student
                })
                return newData
            })
        },
        onError: err => console.log(err)
    })
}

export default useUpdateAttendance