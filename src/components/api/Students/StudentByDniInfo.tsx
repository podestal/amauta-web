import useRetrieveStudent from "../../../hooks/api/student/useRetrieveStudent"
import useAuthStore from "../../../hooks/store/useAuthStore"
import { Classroom } from "../../../services/api/classroomService"
import StudentAdminCard from "./StudentAdminCard"

interface Props {
    studentUid: string
    classrooms: Classroom[]
    classroomId: string
}

const StudentByDniInfo = ({ studentUid, classrooms, classroomId }: Props) => {

    const access = useAuthStore (s => s.access) || ''
    const { data: student, isLoading, isError, error, isSuccess } = useRetrieveStudent({ access, studentId: studentUid })

    if (isLoading) return <p className="animate-pulse text-2xl text-center py-20">Un Momento ...</p>

    if (isError) return <p>Error {error.message}</p>

    if (isSuccess)

  return (
    <StudentAdminCard 
        student={student}
        classrooms={classrooms}
        classroomId={classroomId}
    />
  )
}

export default StudentByDniInfo