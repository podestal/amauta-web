import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getAttendanceService, { Attendance, AttendanceCreateUpdate } from "../../../services/api/attendanceService"
import { SimpleAttendance } from "../../../services/api/studentsService"
import { getStudentsCacheKey } from "../../../utils/cacheKeys"
import { Student } from "../../../services/api/studentsService"

export interface CreateAttendanceData {
    access: string
    attendance: AttendanceCreateUpdate
}

interface Props {
    classroomId: string
}

const useCreateAttendance = ({ classroomId }: Props): UseMutationResult<Attendance, Error, CreateAttendanceData> => {

    const attendanceService = getAttendanceService({})
    const STUDENTS_CACHE_KEY = getStudentsCacheKey(classroomId)
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: CreateAttendanceData) => attendanceService.post(data.attendance, data.access),
        onSuccess: res => {
            queryClient.setQueryData<Student[]>(STUDENTS_CACHE_KEY, (oldData) => {
                if (!oldData) return []
                const newData = oldData.map(student => 
                    student.uid === res.student 
                    ?
                    {
                        ...student,
                        attendances_in: res.kind === 'I' ? res as SimpleAttendance : student.attendances_in, 
                        attendances_out: res.kind === 'O' ? res as SimpleAttendance : student.attendances_out
                    } : student
                )
                return newData
           })
        },
        onError: err => {
            console.log(err)
        }
    })
}

export default useCreateAttendance