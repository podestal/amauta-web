import { useQuery, UseQueryResult } from "@tanstack/react-query"
import getActivityService, { Activity } from "../../../services/api/activityService"

interface Props {
    access: string
    assignatureId: string
    
}

const useGetActivitiesByAssignature = ({ access, assignatureId }: Props): UseQueryResult<Activity[]> => {
    const activityService = getActivityService({ byAssignature: true })
    const params = { assignature: assignatureId }
    
    return useQuery({
        queryKey: ['activities'],
        queryFn: () => activityService.get(access, params),
    })
}

export default useGetActivitiesByAssignature