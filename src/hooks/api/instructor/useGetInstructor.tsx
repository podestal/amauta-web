import { useQuery, UseQueryResult } from "@tanstack/react-query"
import getInstructorService, { Instructor } from "../../../services/api/instructorService"

interface Props {
    access: string
}

const useGetInstructor = ({ access }: Props): UseQueryResult<Instructor, Error> => {

    const instructorService = getInstructorService({ me: true })

    return useQuery({
        queryKey: ['instructor'],
        queryFn: () => instructorService.get(access),
        enabled: access.length > 0,
        staleTime: Infinity, 
    })
}

export default useGetInstructor