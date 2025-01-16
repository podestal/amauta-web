import { Student } from "../../../services/api/studentsService"
import CreateAttendance from "../attendance/CreateAttendance"
import UpdateAttendance from "../attendance/UpdateAttendance"

interface Props {
    student: Student
    classroomId: string
}

const StudentAttendance = ({ student, classroomId}: Props) => {

  console.log('student', student.attendances);
  

  return (
    <div className="w-full">
        {student.attendance
        ? 
        <UpdateAttendance 
          attendances={student.attendance}
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