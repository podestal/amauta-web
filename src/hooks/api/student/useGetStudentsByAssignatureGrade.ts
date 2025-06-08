import { useQuery, UseQueryResult } from "@tanstack/react-query"
import getStudentService, {StudentByAssignatureGrade} from "../../../services/api/studentsService"

interface Props {
    access: string
    assignatures: string[]
    clase: string
    quarter: string
    area: string
}

const useGetStudentsByAssignatureGrade = ({ access, assignatures, clase, quarter, area }: Props): UseQueryResult<StudentByAssignatureGrade[], Error> => {
    const studentService = getStudentService({ byAssignatureGrade: true })
    const params = { assignatures: assignatures.join(','), clase, quarter, area }

    return useQuery({
        queryKey: ['students', assignatures, clase, quarter, area],
        queryFn: () => studentService.get(access, params),
        enabled: area !== '0'
    })
}
export default useGetStudentsByAssignatureGrade