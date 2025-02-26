import { useQuery, UseQueryResult } from "@tanstack/react-query"
import getStudentService, {Student} from "../../../services/api/studentsService"

interface Props {
    access: string
    school: string
}

const useGetStudentsLastTen = ({ access, school }: Props): UseQueryResult<Student[], Error> => {

    const studentService = getStudentService({byLastTen: true})
    const params = { school }

    return useQuery({
        queryKey: [`students last ten` ],
        queryFn: () => studentService.get(access, params),
        enabled: school !== '0'
    })
}

export default useGetStudentsLastTen