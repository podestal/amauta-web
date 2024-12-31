import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getAttendanceService, { Attendance, AttendanceCreateUpdate } from "../../../services/api/attendanceService"
import { getStudentsCacheKey } from "../../../utils/cacheKeys"

interface UpdateAttendanceData {
    access: string
    updates: AttendanceCreateUpdate
}

interface Props {
    attendanceId: number
    classroomId: string
}

const useUpdateAttendance = ({ attendanceId, classroomId }: Props): UseMutationResult<Attendance, Error, UpdateAttendanceData> => {

    const attendanceService = getAttendanceService({ attendanceId })
    const STUDENT_CACHE_KEY = getStudentsCacheKey(classroomId)
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: UpdateAttendanceData) => attendanceService.update(data.updates, data.access),
        onSuccess: res => {
            console.log(res)
            queryClient.invalidateQueries({ queryKey: STUDENT_CACHE_KEY })
        },
        onError: err => console.log(err)
    })
}

export default useUpdateAttendance