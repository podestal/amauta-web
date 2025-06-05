import { useQuery, UseQueryResult } from "@tanstack/react-query"
import getAssignatureService, { Assignature } from "../../../services/api/assignatureService"

interface Props {
    access: string
    classroomId: number
}

const useGetAssignaturesByClassroom = ({ access, classroomId }: Props): UseQueryResult<Assignature[], Error> => {
    const assignatureService = getAssignatureService({ byClassroom: true })
    const params = { classroom: (classroomId).toString() }

    return useQuery({
        queryKey: ['assignatures', classroomId],
        queryFn: () => assignatureService.get(access, params),
        enabled: classroomId !== 0
    })
}
export default useGetAssignaturesByClassroom