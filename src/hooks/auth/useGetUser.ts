import { useQuery, UseQueryResult } from "@tanstack/react-query"
import userService, { User } from "../../services/auth/useService"

interface Props {
    access: string
}

const useGetUser = ({ access }: Props): UseQueryResult<User, Error> => {
    return useQuery({
        queryKey: ['user'],
        queryFn: () => userService.get(access),
        enabled: !!access,
    })
}

export default useGetUser
