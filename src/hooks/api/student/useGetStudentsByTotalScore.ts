import { UseQueryResult, useQuery } from "@tanstack/react-query"
import getStudentService, {StudentByTotalScore} from "../../../services/api/studentsService"

interface Props {
    access: string
    classroomId : string
    quarter: string
}

const useGetStudentsByTotalScore = ({ access, classroomId, quarter }: Props): UseQueryResult<StudentByTotalScore[]> => {
    const studentService = getStudentService({ byTotalScore: true })
    const params = { classroom: classroomId, quarter }
    return useQuery({
        queryKey: [`students ${classroomId} ${quarter}`],
        queryFn: () => studentService.get(access, params),

    })
}
export default useGetStudentsByTotalScore
