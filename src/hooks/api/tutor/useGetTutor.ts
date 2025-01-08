import { useQuery, UseQueryResult } from "@tanstack/react-query"
import tutorService, { Tutor } from "../../../services/api/tutorService"

interface Props {
    access: string
}

const useGetTutor = ({ access }: Props): UseQueryResult<Tutor, Error> => {
    return useQuery({
        queryKey: ['tutor'],
        queryFn: () => tutorService.get(access)
    })
}

export default useGetTutor