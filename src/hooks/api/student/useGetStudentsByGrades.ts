import { UseQueryResult, useQuery } from "@tanstack/react-query"
import getStudentService, {StudentByGrade} from "../../../services/api/studentsService"

interface Props {
    access: string
    classroomId : string
    competence: string
}

const useGetStudentsByGrade = ({ access, classroomId, competence }: Props): UseQueryResult<StudentByGrade[]> => {
    const studentService = getStudentService({ byGrade: true })
    const params = { clase: classroomId, competence, }
    return useQuery({
        queryKey: [`students ${classroomId} ${competence}`],
        queryFn: () => studentService.get(access, params),
    })
}

export default useGetStudentsByGrade
