import { useQuery, UseQueryResult } from "@tanstack/react-query"
import getActivityService, { ActivityByTutor } from "../../../services/api/activityService"

interface Props {
    access: string
    assignatureId: string
    studentUid: string
    show: boolean
}

const useGetActivitiesByTutor = ({ access, assignatureId, studentUid, show }: Props): UseQueryResult<ActivityByTutor[], Error> => {
    const activityService = getActivityService({ byTutor: true })
    const params = { assignature: assignatureId, student: studentUid }

    return useQuery({
        queryKey: [`activities ${assignatureId}`],
        queryFn: () => activityService.get(access, params),
        enabled: show
    })
}

export default useGetActivitiesByTutor