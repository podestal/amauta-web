import useGetStudentsByName from "../../../hooks/api/student/useGetStudentsByName"
import useAuthStore from "../../../hooks/store/useAuthStore"
import { Classroom } from "../../../services/api/classroomService"
import StudentAdminCard from "./StudentAdminCard"

interface Props {
    name: string
    school: number
    classrooms: Classroom[]
    classroomId: string
}

const StudentsByNameInfo = ({ name, school, classrooms, classroomId }: Props) => {

    const access = useAuthStore(s => s.access) || ''

    const { data: students, isLoading, isError, error, isSuccess } = useGetStudentsByName({ access, name, school: school.toString() })

    if (isLoading) return <p className="animate-pulse text-2xl text-center py-20">Un Momento ...</p>

    if (isError) return <p>Error {error.message}</p>

    if (isSuccess)

  return (
    <>
        {students.map(student => (
            <StudentAdminCard 
                student={student}
                classrooms={classrooms}
                classroomId={classroomId}
            />
        ))}
    </>
  )
}

export default StudentsByNameInfo