import { UseQueryResult, useQuery } from "@tanstack/react-query"
import getAnnouncementService, { Announcement } from "../../../services/api/announcementService"
import { getAnnouncementsCacheKey } from "../../../utils/cacheKeys"

interface Props {
    access: string
    studentId?: string
    enable: boolean
    byStudent?: boolean
    byTutor?: boolean
}

const useGetAnnouncements = ({ access, studentId, enable, byStudent, byTutor }: Props): UseQueryResult<Announcement[], Error> => {

    const ANNOUNCEMENTS_CACHE_KEY = getAnnouncementsCacheKey(studentId || 'tutor')
    const announcementService = getAnnouncementService({ byStudent, byTutor })
    const params = {
        student: studentId || ''
    }

    return useQuery({
        queryKey: ANNOUNCEMENTS_CACHE_KEY,
        queryFn: () => studentId ? announcementService.get(access, params) : announcementService.get(access),
        enabled: enable
    })
}

export default useGetAnnouncements