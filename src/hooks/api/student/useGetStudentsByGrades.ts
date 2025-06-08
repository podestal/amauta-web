import { UseQueryResult, useQuery } from "@tanstack/react-query"
import getStudentService, {StudentByGrade} from "../../../services/api/studentsService"

interface Props {
    access: string
    classroomId : string
    competence: string
    quarter: string
}

const useGetStudentsByGrade = ({ access, classroomId, competence, quarter }: Props): UseQueryResult<StudentByGrade[]> => {
    const studentService = getStudentService({ byGrade: true })
    let params: { clase: string; quarter: string; competence?: string } = { clase: classroomId, quarter }
    if (competence !== '0') {
        params = { ...params, competence }
    }
    return useQuery({
        queryKey: [`students ${classroomId} ${competence} ${quarter}`],
        queryFn: () => studentService.get(access, params),
    })
}

export default useGetStudentsByGrade
