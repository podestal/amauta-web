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
        <div className="grid grid-cols-2 mx-6">
          {renderAttendanceAction(
            student.attendances_in,
            "I",
            lan === "EN" ? `${canModifyAttendance ? 'Register Entrance' : 'No Attendance'}` : `${canModifyAttendance ? 'Registrar Entrada' : 'Sin Asistencia'}`
          )}
          {renderAttendanceAction(
            student.attendances_out,
            "O",
            lan === "EN" ? `${canModifyAttendance ? 'Register Exit' : 'No Attendance'}`: `${canModifyAttendance ? 'Registrar Salida' : 'Sin Asistencia'}`
          )}
        </div>
    </div>
  )
}

export default StudentAttendance