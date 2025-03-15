import { UseQueryResult, useQuery } from "@tanstack/react-query"
import getProfileService, { Profile } from "../../../services/api/profileService"

interface Props {
    access: string
    profileName: string
}

const useGetProfile = ({ access, profileName }: Props): UseQueryResult<Profile, Error> => {
    
    const profileService = getProfileService({ profileName, me: true })
    return useQuery({
        queryKey: [`${profileName}s`],
        queryFn: () => profileService.get(access),
        enabled: !!profileName,
    })
}

export default useGetProfile
