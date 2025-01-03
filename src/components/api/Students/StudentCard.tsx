import { Student } from "../../../services/api/studentsService"
import StudentAttendance from "./StudentAttendance"
import Announcements from "../announcement/Announcements"

interface Props {
    student: Student
    classroomId: string
}

const StudentCard = ({ student, classroomId }: Props) => {
  return (
    <div className="w-full grid grid-cols-3 mx-auto gap-4 mt-4">
        <div className="flex items-center justify-start gap-4 col-span-2 ">
          <Announcements 
            student={student}
          />
          <p className="text-sm text-left my-auto">{student.first_name} {student.last_name}</p>
        </div>
        <StudentAttendance 
            student={student}
            classroomId={classroomId}
        />
    </div>
  )
}

export default StudentCard