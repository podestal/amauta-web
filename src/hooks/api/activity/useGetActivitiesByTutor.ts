import { useQuery, UseQueryResult } from "@tanstack/react-query"
import getActivityService, { ActivityByTutor } from "../../../services/api/activityService"

interface Props {
    access: string
    assignatureId: string
    studentUid: string
    show: boolean
    quarter: string
}

const useGetActivitiesByTutor = ({ access, assignatureId, studentUid, show, quarter }: Props): UseQueryResult<ActivityByTutor[], Error> => {
    const activityService = getActivityService({ byTutor: true })
    const params = { assignature: assignatureId, student: studentUid, quarter }
    console.log('quarter', quarter);
    
    return useQuery({
        queryKey: [`activities ${assignatureId}`],
        queryFn: () => activityService.get(access, params),
        enabled: show
    })
}

export default useGetActivitiesByTutor