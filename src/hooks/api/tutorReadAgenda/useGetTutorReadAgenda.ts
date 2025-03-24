import { useQuery, UseQueryResult } from "@tanstack/react-query"
import tutorReadAgendaService, {TutorReadAgenda} from "../../../services/api/tutorReadAgendaService"

interface Props {
    access: string
    student: string
}

const useGetTutorReadAgenda = ({ access, student }: Props): UseQueryResult<TutorReadAgenda[]> => {

    const params = { student }
    return useQuery({
        queryKey: [`tutor-read-agenda ${student}`],
        queryFn: () => tutorReadAgendaService.get(access, params),
    })
}

export default useGetTutorReadAgenda