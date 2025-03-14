import { useQuery, UseQueryResult } from "@tanstack/react-query"
import getInstructorService, { Instructor } from "../../../services/api/instructorService"

interface Props {
    access: string
    school: string
}

const useGetInstructors = ({ access, school }: Props): UseQueryResult<Instructor[], Error> => {

    const instructorService = getInstructorService({ })
    const params = { school }

    return useQuery({
        queryKey: ['instructors'],
        queryFn: () => instructorService.get(access, params),
    })
}

export default useGetInstructors