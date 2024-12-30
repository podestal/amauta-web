import useGetStudents from "../../../hooks/api/student/useGetStudents"
import useAuthStore from "../../../hooks/store/useAuthStore"

interface Props {
    classroom?: string
}

const Students = ({ classroom }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const classroomId = classroom ? classroom : ''
    const {data: students, isLoading, isError, error, isSuccess} = useGetStudents({ access, classroomId })

    if (isLoading) return <p>loading ....</p>

    if (isError) return <p>Error {error.message}</p>

    if (isSuccess)

  return (
    <div>
        {students.map( student => (
            <div key={student.id}>
                <p>{student.first_name}</p>
            </div>
        ))}
    </div>
  )
}

export default Students