import { useQuery, UseQueryResult } from "@tanstack/react-query"
import getStudentService, {Student} from "../../../services/api/studentsService"

interface Props {
    access: string
    name: string
    school: string
}

const useGetStudentsByName = ({ access, name, school }: Props): UseQueryResult<Student[], Error> => {
    
    const studentService = getStudentService({byName: true})
    const params = { name, school }

    return useQuery({
        queryKey: [`students ${name}` ],
        queryFn: () => studentService.get(access, params),
    })
}

export default useGetStudentsByName