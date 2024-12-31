import { Student } from "../../../services/api/studentsService"
import StudentAttendance from "./StudentAttendance"

interface Props {
    student: Student
    classroomId: string
}

const StudentCard = ({ student, classroomId }: Props) => {
  return (
    <div className="w-full flex  justify-between items-center mx-auto gap-4 mt-4">
        <p className="text-xl col-span-2 text-left">{student.first_name} {student.last_name}</p>
        <StudentAttendance 
            student={student}
            classroomId={classroomId}
        />
    </div>
  )
}

export default StudentCard