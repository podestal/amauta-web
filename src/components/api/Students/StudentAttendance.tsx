import { Student } from "../../../services/api/studentsService"
import CreateAttendance from "../attendance/CreateAttendance"
import UpdateAttendance from "../attendance/UpdateAttendance"

interface Props {
    student: Student
    classroomId: string
}

const StudentAttendance = ({ student, classroomId}: Props) => {

  return (
    <div>
        {student.attendance 
        ? 
        <UpdateAttendance 
          attendance={student.attendance}
          studentId={student.uid}
          classroomId={classroomId}
        />
        : 
        <CreateAttendance 
          studentId={student.uid}
          classroomId={classroomId}
        />}
    </div>
  )
}

export default StudentAttendance