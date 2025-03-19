import { useQuery, UseQueryResult } from "@tanstack/react-query"
import getAnnouncementService, {Announcement} from "../../../services/api/announcementService"

interface Props {
    date: string
    student: string
    access: string
    enable: boolean
}

const useGetAnnouncementsByDate = ({ date, student, access, enable }: Props): UseQueryResult<Announcement[], Error> => {
    const announcementService = getAnnouncementService({ byDate: true })
    const params = { student, date }
    return useQuery({
        queryKey: [`announcements ${student}`,],
        queryFn: () => announcementService.get(access, params),
        enabled: enable
    })
}

export default useGetAnnouncementsByDate
