import useLanguageStore from "../../../hooks/store/useLanguageStore"
import { SimpleAttendance, Student } from "../../../services/api/studentsService"
import CreateAttendance from "../attendance/CreateAttendance"
import UpdateAttendance from "../attendance/UpdateAttendance"

interface Props {
    student: Student
    classroomId: string
    canModifyAttendance: boolean
}

const StudentAttendance = ({ student, classroomId, canModifyAttendance}: Props) => {

  const lan = useLanguageStore(s => s.lan)
  const attendanceIn: SimpleAttendance = student.attendances_in[0]
  const attendanceOut: SimpleAttendance = student.attendances_out[0]

  const renderAttendanceAction = ( attendance: SimpleAttendance, kind: string, label: string) => {
    return attendance 
      ? 
      (
        <UpdateAttendance 
          attendance={attendance}
          studentId={student.uid}
          classroomId={classroomId}
          kind={kind}
          canModifyAttendance={canModifyAttendance}
        />
      )
      :
      (
        <CreateAttendance 
          studentId={student.uid}
          classroomId={classroomId}
          kind={kind}
          label={label}
          canModifyAttendance={canModifyAttendance}
        />
      )
  }
  

  return (
    <div className="w-full">
        <div className="grid grid-cols-2 mx-6 gap-6">
          {renderAttendanceAction(
            attendanceIn,
            "I",
            lan === "EN" ? `${canModifyAttendance ? 'Entrance' : 'No Attendance'}` : `${canModifyAttendance ? 'Entrada' : 'Sin Asistencia'}`
          )}
          {renderAttendanceAction(
            attendanceOut,
            "O",
            lan === "EN" ? `${canModifyAttendance ? 'Exit' : 'No Attendance'}`: `${canModifyAttendance ? 'Salida' : 'Sin Asistencia'}`
          )}
        </div>
    </div>
  )
}

export default StudentAttendance