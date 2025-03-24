import useGetStudentByAgendas from "../../../../hooks/api/student/useGetStudentByAgendas"
import useAuthStore from "../../../../hooks/store/useAuthStore"
import useSchoolStore from "../../../../hooks/store/useSchoolStore"

interface Props {
    classroom: string
}

const StudentAgendasList = ({ classroom }: Props) => {

    const school = useSchoolStore(s => s.school).id
    const access = useAuthStore(s => s.access) || ''
    const { data: students, isLoading, isError, error, isSuccess } = useGetStudentByAgendas({ access, school: school.toString(), classroom })
    
    if (isLoading) return <p className="text-center animate-pulse my-8">Cargando...</p>

    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess)

  return (
    <div>
        <>{console.log('students', students)}</>
    </div>
  )
}

export default StudentAgendasList