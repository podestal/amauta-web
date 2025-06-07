import { useQuery, UseQueryResult } from "@tanstack/react-query"
import getStudentService, { StudentByAreaGrade } from "../../../services/api/studentsService"

interface Props {
    access: string
    areas: string[]
    quarter: string
    clase: string
}

const useGetStudentsByAreaGrade = ({ access, areas, quarter, clase }: Props): UseQueryResult<StudentByAreaGrade[]> => {
    const studentService = getStudentService({ byAreaGrade: true })
    const params = { clase, areas: areas.join(','), quarter }

    return useQuery({
        queryKey: [`students ${clase} ${areas.join(',')} ${quarter}`],
        queryFn: () => studentService.get(access, params),
        enabled: clase !== '0'
    })
}   

export default useGetStudentsByAreaGrade

