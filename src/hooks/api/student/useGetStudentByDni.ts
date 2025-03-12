import { useQuery, UseQueryResult } from "@tanstack/react-query"
import getStudentService, {Student} from "../../../services/api/studentsService"

interface Props {
    dni: string
    access: string
    validator?: boolean
}

const useGetStudentByDni = ({ dni, access, validator }: Props): UseQueryResult<Student, Error> => {
    const studentService = getStudentService({byDni: true})
    const params = { dni }

    return useQuery({
        queryKey: [`student ${dni}`],
        queryFn: () => studentService.get(access, params),
        enabled:  dni !== null && dni.length === 8,
        retry: !validator ? true : false
    })
}

export default useGetStudentByDni