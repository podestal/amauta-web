import { useEffect } from "react";
import useGetAttendance from "../../../hooks/api/attendance/useGetAttendance";
import useAuthStore from "../../../hooks/store/useAuthStore";
import QRScanner from "../../ui/QRScanner";
import { Attendance } from "../../../services/api/attendanceService";
import useLoader from "../../../hooks/ui/useLoader";

interface Props {
    onScanSuccess: (decodedText: string, stopScanner: any, resumeScanner: any) => void
    selectedStatus: string
    classroomId: string
    setAttendances: React.Dispatch<React.SetStateAction<Attendance[]>>
    errorMessage: string
}

const AttendanceScanner = ({ onScanSuccess, selectedStatus, classroomId, setAttendances, errorMessage }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    
    const { data: attendances, isLoading, isError, error, isSuccess } = useGetAttendance({ access, classroomId })

    useEffect(() => {
        if (attendances) {
            setAttendances(attendances)
        }
    }, [attendances, setAttendances])

    useLoader(isLoading)

    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess)

  return (
    <QRScanner 
        onScanSuccess={onScanSuccess}
        selectedStatus={selectedStatus}
        errorMessage={errorMessage}
    />
  )
}

export default AttendanceScanner