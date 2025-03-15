import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"
import getProfileService, { Profile } from "../../../services/api/profileService"

interface ProfileData {
    access: string
    profile: Profile
}

interface Props {
    profileName: string
}

const useCreateProfile = ({ profileName }: Props): UseMutationResult<Profile, Error, ProfileData> => {
    const profileService = getProfileService({ profileName })
    const queryClient = useQueryClient()
    const queryKey = profileName === 'manager' ? ['admins'] : [`${profileName}s`]

    return useMutation({
        mutationFn: (profile: ProfileData) => profileService.post(profile.profile, profile.access),
        onSuccess: () => queryClient.invalidateQueries({queryKey}),
    })
}

export default useCreateProfile
