import { useQuery, UseQueryResult } from "@tanstack/react-query"
import getGradeService, { GradeByStudent } from "../../../services/api/gradeService"

interface Props {
    access: string
    student: string
    quarter: string
}

const useGetGradesByStudent = ({ access, student, quarter }: Props): UseQueryResult<GradeByStudent[]> => {

    const gradesService = getGradeService({ byStudent: true })
    const params = { student, quarter }

    return useQuery({
        queryKey: ['grades', student, quarter],
        queryFn: () => gradesService.get(access, params),
    })
}

export default useGetGradesByStudent