import { useQuery, UseQueryResult } from "@tanstack/react-query"
import instructorService, { Instructor } from "../../../services/api/instructorService"

interface Props {
    access: string
}

const useGetInstructor = ({ access }: Props): UseQueryResult<Instructor, Error> => {
    return useQuery({
        queryKey: ['instructor'],
        queryFn: () => instructorService.get(access),
        enabled: access.length > 0,
        staleTime: Infinity, 
    })
}

export default useGetInstructor