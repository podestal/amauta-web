import { Student } from "../../../services/api/studentsService"
import StudentAttendance from "./StudentAttendance"

interface Props {
    student: Student
    classroomId: string
}

const StudentCard = ({ student, classroomId }: Props) => {
  return (
    <div className="w-full grid grid-cols-3 mx-auto gap-4 mt-4">
        <p className="text-sm col-span-2 text-left my-auto">{student.first_name} {student.last_name}</p>
        <StudentAttendance 
            student={student}
            classroomId={classroomId}
        />
    </div>
  )
}

export default StudentCard