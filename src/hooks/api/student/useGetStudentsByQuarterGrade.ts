import { UseQueryResult, useQuery } from "@tanstack/react-query"
import getStudentService, {StudentByQuarterGrade} from "../../../services/api/studentsService"

interface Props {
    access: string
    classroomId : string
    competencies: string[]
    assignatureId: string
}

const useGetStudentsByQuarterGrade = ({ access, classroomId, competencies, assignatureId }: Props): UseQueryResult<StudentByQuarterGrade[]> => {
    const studentService = getStudentService({ byQuarterGrade: true })
    const params = { clase: classroomId, competencies: competencies.join(','), }
    return useQuery({
        queryKey: [`students ${classroomId} ${assignatureId} ${competencies.join(',')}`],
        queryFn: () => studentService.get(access, params),

    })
}

export default useGetStudentsByQuarterGrade
