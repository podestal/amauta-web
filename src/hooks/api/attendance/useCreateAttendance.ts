import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getAttendanceService, { Attendance, AttendanceCreateUpdate } from "../../../services/api/attendanceService"
import { getStudentsCacheKey } from "../../../utils/cacheKeys"

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
            console.log(res)
            queryClient.invalidateQueries({ queryKey: STUDENTS_CACHE_KEY })
        },
        onError: err => {
            console.log(err)
        }
    })
}

export default useCreateAttendance