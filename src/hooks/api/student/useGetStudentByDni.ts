import { useQuery, UseQueryResult } from "@tanstack/react-query"
import getStudentService, {Student} from "../../../services/api/studentsService"

interface Props {
    dni: string
    access: string
}

const useGetStudentByDni = ({ dni, access }: Props): UseQueryResult<Student, Error> => {
    const studentService = getStudentService({byDni: true})
    const params = { dni }

    return useQuery({
        queryKey: [`student ${dni}`],
        queryFn: () => studentService.get(access, params),
    })
}

export default useGetStudentByDni