import { UseQueryResult, useQuery } from "@tanstack/react-query"
import getAssignatureService, {Assignature} from "../../../services/api/assignatureService"

interface Props {
    access: string
    byInstructor?: boolean
}

const useGetAssignature = ({ access, byInstructor }: Props): UseQueryResult<Assignature[], Error> => {
    const assignatureService = getAssignatureService({ byInstructor })
    return useQuery({
        queryKey: [`assignatures ${byInstructor}`],
        queryFn: () => assignatureService.get(access),
    })
}

export default useGetAssignature