import { UseQueryResult, useQuery } from "@tanstack/react-query"
import getSchoolService, { School } from "../../../services/api/schoolService"
import { Profile } from "../../../services/api/profileService"

interface Props {
    access: string
    profile?: Profile
}

const useGetSchool = ({ access, profile }: Props): UseQueryResult<School, Error> => {
    return useQuery({
        queryKey: ['school', profile?.school],
        queryFn: async () => {
            if (!profile) return Promise.reject(new Error("Profile is not available")); 
            const schoolService = getSchoolService({ schoolId: profile.school });
            return schoolService.get(access);
        },
        enabled: !!profile
    });
}

export default useGetSchool