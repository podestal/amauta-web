import { useQuery, UseQueryResult } from "@tanstack/react-query"
import getLessonService, { Lesson } from "../../../services/api/lessonService"

interface Props {
    access: string
    assignatureId: string
}

const useGetLessonsByAssignature = ({ access, assignatureId }: Props): UseQueryResult<Lesson[], Error> => {
    const lessonService = getLessonService({byAssignature: true})
    const params = { assignature: assignatureId }
    return useQuery({
        queryKey: [`lessons ${assignatureId}`],
        queryFn: () => lessonService.get(access, params)
    })
}

export default useGetLessonsByAssignature