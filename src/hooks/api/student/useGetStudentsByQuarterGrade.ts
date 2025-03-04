import { UseQueryResult, useQuery } from "@tanstack/react-query"
import getStudentService, {StudentByQuarterGrade} from "../../../services/api/studentsService"

interface Props {
    access: string
    classroomId : string
    competencies: string[]
    assignatureId: string
    quarter: string
}

const useGetStudentsByQuarterGrade = ({ access, classroomId, competencies, assignatureId, quarter }: Props): UseQueryResult<StudentByQuarterGrade[]> => {
    const studentService = getStudentService({ byQuarterGrade: true })
    const params = { clase: classroomId, competencies: competencies.join(','), quarter }
    return useQuery({
        queryKey: [`students ${classroomId} ${assignatureId} ${competencies.join(',')} ${quarter}`],
        queryFn: () => studentService.get(access, params),

    })
}

export default useGetStudentsByQuarterGrade
