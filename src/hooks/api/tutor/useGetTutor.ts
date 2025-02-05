import { useQuery, UseQueryResult } from "@tanstack/react-query"
import getTutorService, {Tutor} from "../../../services/api/tutorService"

interface Props {
    access: string
}

const useGetTutor = ({ access }: Props): UseQueryResult<Tutor, Error> => {

    const tutorService = getTutorService({me: true})

    return useQuery({
        queryKey: ['tutor'],
        queryFn: () => tutorService.get(access)
    })
}

export default useGetTutor