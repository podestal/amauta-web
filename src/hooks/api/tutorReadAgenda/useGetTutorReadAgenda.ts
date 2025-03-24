import { useQuery, UseQueryResult } from "@tanstack/react-query"
import tutorReadAgendaService, {TutorReadAgenda} from "../../../services/api/tutorReadAgendaService"

interface Props {
    access: string
    student: string
    date: string
    annoucements: boolean
}

const useGetTutorReadAgenda = ({ access, student, date, annoucements }: Props): UseQueryResult<TutorReadAgenda[]> => {

    const params = { student, date }
    return useQuery({
        queryKey: [`tutor-read-agenda ${student} ${date}`],
        queryFn: () => tutorReadAgendaService.get(access, params),
        enabled: annoucements

    })
}

export default useGetTutorReadAgenda