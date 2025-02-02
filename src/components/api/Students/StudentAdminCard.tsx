import { Student } from "../../../services/api/studentsService"

interface Props {
    student: Student
}

const StudentAdminCard = ({ student }: Props) => {
  return (
    <div>
        <>{console.log(student)}</>
        <p>{student.first_name}</p>
    </div>
  )
}

export default StudentAdminCard