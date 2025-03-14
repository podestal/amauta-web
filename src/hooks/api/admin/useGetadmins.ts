import { useQuery, UseQueryResult } from "@tanstack/react-query"
import getAdminService, { Admin } from "../../../services/api/adminService"

interface Props {
    access: string
}

const useGetAdmins = ({ access }: Props): UseQueryResult<Admin[], Error> => {

    const adminService = getAdminService({ })
    return useQuery({
        queryKey: ['admins'],
        queryFn: () => adminService.get(access),
    })
}

export default useGetAdmins