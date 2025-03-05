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
    const params = { clase: classroomId, competence, quarter }
    return useQuery({
        queryKey: [`students ${classroomId} ${competence} ${quarter}`],
        queryFn: () => studentService.get(access, params),
    })
}

export default useGetStudentsByGrade
