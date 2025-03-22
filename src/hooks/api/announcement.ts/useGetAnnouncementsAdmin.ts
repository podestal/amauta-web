import { useQuery, UseQueryResult } from "@tanstack/react-query"
import getAnnouncementService, {Announcement} from "../../../services/api/announcementService"

interface Props {
    school: string
    access: string
    page?: string
    pageSize: string
}

const useGetAnnouncementsAdmin = ({ school, access, page='1', pageSize }: Props): UseQueryResult<Announcement[], Error> => {
    const announcementService = getAnnouncementService({ byAdmin: true })
    const params = { school, page, page_size: pageSize }
    return useQuery({
        queryKey: [`announcements admin ${school} ${page}`,],
        queryFn: () => announcementService.get(access, params),
    })
}

export default useGetAnnouncementsAdmin