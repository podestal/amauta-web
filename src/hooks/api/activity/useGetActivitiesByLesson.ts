import { useQuery, UseQueryResult } from "@tanstack/react-query"
import getActivityService, {Activity} from "../../../services/api/activityService"

interface Props {
    access: string
    lessonId: string
}

const useGetActivitiesByLesson = ({ access, lessonId }: Props): UseQueryResult<Activity[]> => {
    const activityService = getActivityService({ byLesson: true })
    const ACTIVITY_QUERY_KEY = [`activities ${lessonId}`] 
    let params: { lesson: string } = { lesson: lessonId }
    
    return useQuery({
        queryKey: ACTIVITY_QUERY_KEY,
        queryFn: () => activityService.get(access, params),
    })
}

export default useGetActivitiesByLesson