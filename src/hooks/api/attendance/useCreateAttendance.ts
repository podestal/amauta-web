import { UseMutationResult, useMutation } from "@tanstack/react-query"
import getAttendanceService, { Attendance, AttendanceCreateUpdate } from "../../../services/api/attendanceService"

export interface CreateAttendanceData {
    access: string
    attendance: AttendanceCreateUpdate
}

const useCreateAttendance = (): UseMutationResult<Attendance, Error, CreateAttendanceData> => {

    const attendanceService = getAttendanceService({})
    // const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: CreateAttendanceData) => attendanceService.post(data.attendance, data.access),
        onSuccess: res => {
            console.log(res)
        },
        onError: err => {
            console.log(err)
        }
    })
}

export default useCreateAttendance