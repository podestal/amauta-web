import useGetStudentsByAreaGrade from "../../../../../../hooks/api/student/useGetStudentsByAreaGrade"
import useAuthStore from "../../../../../../hooks/store/useAuthStore"

// areas: string[]
// quarter: string
// clase: string

interface Props {
    areas: string[]
    quarter: string
    clase: string
}

const GradesTableBodyAreas = ({ areas, quarter, clase }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const {data: students, isLoading, isError, error, isSuccess} = useGetStudentsByAreaGrade({ access, areas, quarter, clase })

    if (isLoading) return <p className='text-center animate-pulse text-xs my-4'>Cargando...</p>
    if (isError) return <p className='text-center text-red-500 text-xs my-4'>Error: {error.message}</p>
    if (isSuccess)
    

  return (
    <div>
        <>{console.log("students", students)}</>
        <p>Body</p>
    </div>
  )
}

export default GradesTableBodyAreas