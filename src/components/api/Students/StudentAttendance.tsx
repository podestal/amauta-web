import useLanguageStore from "../../../hooks/store/useLanguageStore"
import { Student } from "../../../services/api/studentsService"
import { SimpleAttendance } from "../../../services/api/studentsService"
import CreateAttendance from "../attendance/CreateAttendance"
import UpdateAttendance from "../attendance/UpdateAttendance"

interface Props {
    student: Student
    classroomId: string
}

const StudentAttendance = ({ student, classroomId}: Props) => {

  console.log('attendances', student.attendances);
  const lan = useLanguageStore(s => s.lan)
  const attendances: { [key: string]: SimpleAttendance } = student.attendances

  return (
    <div className="w-full">
        {/* {student.attendances
        ? 
        <UpdateAttendance 
          attendances={student.attendances}
          studentId={student.uid}
          classroomId={classroomId}
        />
        : 
        <CreateAttendance 
          studentId={student.uid}
          classroomId={classroomId}
          kind="I"
        />} */}
        <div className="grid grid-cols-2 mx-6">
          {attendances['In'] 
          ? 
          <UpdateAttendance 
            attendance={attendances['In']}
            studentId={student.uid}
            classroomId={classroomId}
          /> 
          : 
          <CreateAttendance 
            studentId={student.uid}
            classroomId={classroomId}
            kind="I"
            label={lan === 'EN' ? 'Register Entance' : 'Registrar Entrada'}
          />}
          <CreateAttendance 
            studentId={student.uid}
            classroomId={classroomId}
            kind="O"
            label={lan === 'EN' ? 'Register Exit' : 'Registrar Salida'}
          />
        </div>
    </div>
  )
}

export default StudentAttendance