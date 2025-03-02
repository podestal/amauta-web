import { useQuery, UseQueryResult } from "@tanstack/react-query"
import getAssignatureService, { AssignatureByTutor } from "../../../services/api/assignatureService"

interface Props {
    access: string
    studentId: string
    quarter: string
}

const useGetAssignaturesByTutor = ({ access, studentId, quarter }: Props): UseQueryResult<AssignatureByTutor[]> => {
    
    const assignatureService = getAssignatureService({ byTutor: true })
    const params = { student: studentId, quarter }
    return useQuery({
        queryKey: [`assignatures ${studentId} ${quarter}`],
        queryFn: () => assignatureService.get(access, params),
        // enabled: !!studentId
    })
}

export default useGetAssignaturesByTutor