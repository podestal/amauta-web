import { useQuery, UseQueryResult } from "@tanstack/react-query"
import getAdminService, { Admin } from "../../../services/api/adminService"

interface Props {
    access: string
    school: string
}

const useGetAdmins = ({ access, school }: Props): UseQueryResult<Admin[], Error> => {
    
    const adminService = getAdminService({ })
    const params = { school }
    return useQuery({
        queryKey: ['admins'],
        queryFn: () => adminService.get(access, params),
    })
}

export default useGetAdmins