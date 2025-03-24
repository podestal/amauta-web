import { useQuery, UseQueryResult } from "@tanstack/react-query"
import getSchoolService, {School} from "../../../services/api/schoolService"

interface Props {
    access: string
}

const useGetSchools = ({access}: Props): UseQueryResult<School[], Error> => {
    return useQuery({
        queryKey: ['schools admin'],
        queryFn: () => getSchoolService({}).get(access),
    });
}

export default useGetSchools