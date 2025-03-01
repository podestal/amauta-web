import { useQuery, UseQueryResult } from "@tanstack/react-query"
import getAssignatureService, { AssignatureByTutor } from "../../../services/api/assignatureService"

interface Props {
    access: string
    studentId: string
}

const useGetAssignaturesByTutor = ({ access, studentId }: Props): UseQueryResult<AssignatureByTutor[]> => {

    console.log('studentId', studentId);
    
    const assignatureService = getAssignatureService({ byTutor: true })
    const params = { student: studentId }
    return useQuery({
        queryKey: ['assignatures', studentId],
        queryFn: () => assignatureService.get(access, params),
        // enabled: !!studentId
    })
}

export default useGetAssignaturesByTutor