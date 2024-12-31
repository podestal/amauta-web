import { Student } from "../../../services/api/studentsService"
import getAttendanceLabel from "../../../utils/getAttendanceLabel"
import useLanguageStore from "../../../hooks/store/useLanguageStore"
import CreateAttendance from "../attendance/CreateAttendance"

interface Props {
    student: Student
}

const StudentAttendance = ({ student }: Props) => {

    const lan = useLanguageStore(s => s.lan)
    const attendance = student.attendance ? student.attendance?.status : ''
    const attendanceLabel = getAttendanceLabel({ lan, attendance })

  return (
    <div>
        {student.attendance 
        ? 
        <p className={`py-2 px-4 text-center font-bold rounded-2xl
            ${attendance === 'O' && 'bg-green-500'}
            ${attendance === 'L' && 'bg-amber-500'}
            ${attendance === 'N' && 'bg-red-500'}
            ${attendance === 'E' && 'bg-green-500'}
            ${attendance === 'T' && 'bg-yellow-500'}
            `}>{attendanceLabel}</p>
        : 
        <CreateAttendance 
          studentId={student.id}
        />}
    </div>
  )
}

export default StudentAttendance