import useGetStudentsByName from "../../../hooks/api/student/useGetStudentsByName"
import useAuthStore from "../../../hooks/store/useAuthStore"

interface Props {
    name: string
    school: number
}

const StudentsByNameInfo = ({ name, school }: Props) => {

    const access = useAuthStore(s => s.access) || ''

    const { data: students, isLoading, isError, error, isSuccess } = useGetStudentsByName({ access, name, school: school.toString() })

    if (isLoading) return <p className="animate-pulse text-2xl text-center py-20">Un Momento ...</p>

    if (isError) return <p>Error {error.message}</p>

    if (isSuccess)

  return (
    <div>
        <>{console.log('students', students)}</>
    </div>
  )
}

export default StudentsByNameInfo