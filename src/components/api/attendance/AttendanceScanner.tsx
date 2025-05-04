import QRScanner from "../../ui/QRScanner";
import { Attendance } from "../../../services/api/attendanceService";


interface Props {
    onScanSuccess: (decodedText: string, pauseScanner: any, resumeScanner: any, stopScanner: any) => void
    classroomId: string
    setAttendances: React.Dispatch<React.SetStateAction<Attendance[]>>
    errorMessage: string
    leftEarly: boolean
}

const AttendanceScanner = ({ onScanSuccess, errorMessage, leftEarly }: Props) => {

  return (
    <QRScanner 
        onScanSuccess={onScanSuccess}
        errorMessage={errorMessage}
        leftEarly={leftEarly}
    />
  )
}

export default AttendanceScanner