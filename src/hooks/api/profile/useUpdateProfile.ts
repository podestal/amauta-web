import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getProfileService, {Profile} from "../../../services/api/profileService"

export interface ProfileData {
    access: string
    profile: Profile
}

interface Props {
    profileId: string
    profileName: string
}

const useUpdateProfile = ({ profileId, profileName }: Props): UseMutationResult<Profile, Error, ProfileData> => {
    const profileService = getProfileService({ profileId, profileName })
    const queryClient = useQueryClient()
    const queryKey = profileName === 'manager' ? ['admins'] : [`${profileName}s`]


    return useMutation({
        mutationFn: (profile: ProfileData) => profileService.update(profile.profile, profile.access),
        onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    })
}

export default useUpdateProfile


