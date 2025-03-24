import { UseQueryResult, useQuery } from "@tanstack/react-query"
import getStudentService, {StudentByAgendas} from "../../../services/api/studentsService"

interface Props {
    access: string
    school: string
    classroom: string
}

const useGetStudentByAgendas = ({ access, school, classroom }: Props): UseQueryResult<StudentByAgendas[], Error> => {
    
    const studentService = getStudentService({ byAgendas: true })
    const params = { school, classroom }

    return useQuery({
        queryKey: [`student-by-agendas ${school} ${classroom}`],
        queryFn: () => studentService.get(access, params),
        enabled: classroom !== ''
    })
}

export default useGetStudentByAgendas