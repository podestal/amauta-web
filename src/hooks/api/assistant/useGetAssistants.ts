import { useQuery, UseQueryResult } from "@tanstack/react-query"
import getAssistantService, { Assistant } from "../../../services/api/assistantService"

interface Props {
    access: string
    school: string
}

const useGetAssistants = ({ access, school }: Props): UseQueryResult<Assistant[], Error> => {

    const assistantService = getAssistantService({ })
    const params = { school }

    return useQuery({
        queryKey: ['assistants'],
        queryFn: () => assistantService.get(access, params),
    })
}

export default useGetAssistants