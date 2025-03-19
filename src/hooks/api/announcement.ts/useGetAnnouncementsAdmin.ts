import { useQuery, UseQueryResult } from "@tanstack/react-query"
import getAnnouncementService, {Announcement} from "../../../services/api/announcementService"

interface Props {
    school: string
    access: string
}

const useGetAnnouncementsAdmin = ({ school, access }: Props): UseQueryResult<Announcement[], Error> => {
    const announcementService = getAnnouncementService({ byAdmin: true })
    const params = { school }
    return useQuery({
        queryKey: [`announcements admin ${school}`,],
        queryFn: () => announcementService.get(access, params),
    })
}

export default useGetAnnouncementsAdmin