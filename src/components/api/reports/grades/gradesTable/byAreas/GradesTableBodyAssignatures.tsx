import useGetStudentsByAssignatureGrade from "../../../../../../hooks/api/student/useGetStudentsByAssignatureGrade"
import useAuthStore from "../../../../../../hooks/store/useAuthStore"
import { Assignature } from "../../../../../../services/api/assignatureService"

interface Props {
    area: string
    assignatures: Assignature[]
    clase: string
    quarter: string
}

const GradesTableBodyAssignatures = ({ area, assignatures, clase, quarter }: Props) => {

    // console.log('assignature', assignature)

    const access = useAuthStore(s => s.access) || ''
    const filteredAssignaturesIds = assignatures.filter(assignature => assignature.clase === parseInt(clase) && assignature.area.toString() === area).map(assignature => assignature.id.toString());
    const { data: students, isLoading, isError, error, isSuccess } = useGetStudentsByAssignatureGrade({ access, assignatures: filteredAssignaturesIds, clase, quarter, area })

    if (isLoading) return <p className="animate-pulse text-center my-8 text-xl">Cargando...</p>
    if (isError) return <p>Error: {error.message}</p>
    if (isSuccess)

  return (
    <div>
        <>{console.log("students", students)}</>
        <p>fdasfasdfsdf</p>
    </div>
  )
}

export default GradesTableBodyAssignatures