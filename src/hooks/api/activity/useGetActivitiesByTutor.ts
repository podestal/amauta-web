import { useQuery, UseQueryResult } from "@tanstack/react-query"
import getActivityService, { ActivityByTutor } from "../../../services/api/activityService"

interface Props {
    access: string
    assignatureId: string
    show: boolean
}

const useGetActivitiesByTutor = ({ access, assignatureId, show }: Props): UseQueryResult<ActivityByTutor[], Error> => {
    const activityService = getActivityService({ byAssignature: true })

    return useQuery({
        queryKey: [`activities ${assignatureId}`],
        queryFn: () => activityService.get(access, { assignature: assignatureId }),
        enabled: show
    })
}

export default useGetActivitiesByTutor