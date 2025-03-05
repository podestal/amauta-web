import { useQuery, UseQueryResult } from "@tanstack/react-query"
import getActivityService, { Activity } from "../../../services/api/activityService"

interface Props {
    access: string
    assignatureId: string
    competence?: string
    quarter: string
}

const useGetActivitiesByAssignature = ({ access, assignatureId, competence, quarter }: Props): UseQueryResult<Activity[]> => {
    const activityService = getActivityService({ byAssignature: true })
    const ACTIVITY_QUERY_KEY = competence ? [`activities ${assignatureId} ${quarter} ${competence}`] : [`activities ${quarter} ${assignatureId}`] 
    let params: { assignature: string; quarter: string; competence?: string } = { assignature: assignatureId, quarter }
    if (competence) {
        params = { ...params, competence }
    }
    
    return useQuery({
        queryKey: ACTIVITY_QUERY_KEY,
        queryFn: () => activityService.get(access, params),
    })
}

export default useGetActivitiesByAssignature