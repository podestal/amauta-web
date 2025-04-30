import { useQuery, UseQueryResult } from "@tanstack/react-query"
import getLessonService, { Lesson } from "../../../services/api/lessonService"

interface Props {
    access: string
    assignatureId: string
    quarter: string
}

const useGetLessonsByAssignature = ({ access, assignatureId, quarter }: Props): UseQueryResult<Lesson[], Error> => {
    const lessonService = getLessonService({byAssignature: true})
    const params = { assignature: assignatureId, quarter }
    return useQuery({
        queryKey: [`lessons ${assignatureId} ${quarter}`],
        queryFn: () => lessonService.get(access, params),
    })
}

export default useGetLessonsByAssignature