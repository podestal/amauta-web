import useLanguageStore from "../../../hooks/store/useLanguageStore"
import { Student } from "../../../services/api/studentsService"
import CreateAttendance from "../attendance/CreateAttendance"
import UpdateAttendance from "../attendance/UpdateAttendance"

interface Props {
    student: Student
    classroomId: string
}

const StudentAttendance = ({ student, classroomId}: Props) => {

  const lan = useLanguageStore(s => s.lan)
  const attendancesIn = student.attendances_in
  const attendancesOut = student.attendances_out
  

  return (
    <div className="w-full">
        <div className="grid grid-cols-2 mx-6">
          {attendancesIn
          ? 
          <UpdateAttendance 
            attendance={attendancesIn}
            studentId={student.uid}
            classroomId={classroomId}
            kind="I"
          /> 
          : 
          <CreateAttendance 
            studentId={student.uid}
            classroomId={classroomId}
            kind="I"
            label={lan === 'EN' ? 'Register Entance' : 'Registrar Entrada'}
          />}
          {attendancesOut
          ?
          <UpdateAttendance 
            attendance={attendancesOut}
            studentId={student.uid}
            classroomId={classroomId}
            kind="O"
          /> 
          : 
          <CreateAttendance 
            studentId={student.uid}
            classroomId={classroomId}
            kind="O"
            label={lan === 'EN' ? 'Register Exit' : 'Registrar Salida'}
          />}
        </div>
    </div>
  )
}

export default StudentAttendance