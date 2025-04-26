import { useQuery, UseQueryResult } from "@tanstack/react-query"
import getLessonService, { Lesson } from "../../../services/api/lessonService"

interface Props {
    access: string
}

const useGetLessons = ({ access }: Props): UseQueryResult<Lesson[], Error> => {
    const lessonService = getLessonService({})
    return useQuery({
        queryKey: ['lessons'],
        queryFn: () => lessonService.get(access)
    })
}

export default useGetLessons