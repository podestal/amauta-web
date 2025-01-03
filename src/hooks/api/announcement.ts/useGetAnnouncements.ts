import { UseQueryResult, useQuery } from "@tanstack/react-query"
import getAnnouncementService, { Announcement } from "../../../services/api/announcementService"
import { getAnnouncementsCacheKey } from "../../../utils/cacheKeys"

interface Props {
    access: string
    studentId: string
    enable: boolean
}

const useGetAnnouncements = ({ access, studentId, enable }: Props): UseQueryResult<Announcement[], Error> => {

    const ANNOUNCEMENTS_CACHE_KEY = getAnnouncementsCacheKey(studentId)
    const announcementService = getAnnouncementService({ byStudent: true })
    const params = {
        student: studentId
    }

    return useQuery({
        queryKey: ANNOUNCEMENTS_CACHE_KEY,
        queryFn: () => announcementService.get(access, params),
        enabled: enable
    })
}

export default useGetAnnouncements