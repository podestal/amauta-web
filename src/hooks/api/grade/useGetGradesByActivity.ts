import { useQuery, UseQueryResult } from "@tanstack/react-query"
import getGradeService, { GradeByActivity } from "../../../services/api/gradeService"

interface Props {
    access: string
    activityId: string
}

const useGetGradesByActivity = ({ access, activityId }: Props): UseQueryResult<GradeByActivity[], Error> => {
    const gradeService = getGradeService({ byActivity: true })
    const params = { activity: activityId }
    
    return useQuery({
        queryKey: [`grades ${activityId}`],
        queryFn: () => gradeService.get(access, params),
    })

}

export default useGetGradesByActivity