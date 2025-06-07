import { UseQueryResult, useQuery } from "@tanstack/react-query"
import getAssignatureService, { Assignature } from "../../../services/api/assignatureService"

interface Props {
    access: string
    instructor: string
    classroom: string
    area: string
}

const useGetAssignatureByAuxiliaryRegister = ({ access, instructor, classroom, area }: Props): UseQueryResult<Assignature[], Error> => {
    const assignatureService = getAssignatureService({ byAuxiliarRegister: true })
    const params = { instructor, classroom, area }

    return useQuery({
        queryKey: ['assignatures', instructor, classroom, area],
        queryFn: () => assignatureService.get(access, params),
    })
}

export default useGetAssignatureByAuxiliaryRegister