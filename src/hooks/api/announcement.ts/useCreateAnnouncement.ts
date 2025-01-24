import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getAnnouncementService, { Announcement, AnnouncementCreateUpdate } from "../../../services/api/announcementService"
import { getAnnouncementsCacheKey } from "../../../utils/cacheKeys"

export interface CreateAnnouncementData {
    access: string
    announcement: AnnouncementCreateUpdate
}

interface Props {
    studentId: string
}

const useCreateAnnouncement = ({ studentId }: Props): UseMutationResult<Announcement, Error, CreateAnnouncementData> => {
    
    const announcementService = getAnnouncementService({})
    const ANNOUNCEMENTS_CACHE_KEY = getAnnouncementsCacheKey(studentId)
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: CreateAnnouncementData) => announcementService.post(data.announcement, data.access),
        onSuccess: res => {
            queryClient.setQueryData<Announcement[]>(ANNOUNCEMENTS_CACHE_KEY, oldData => {
                if (!oldData) return []
                const newData = [res, ...oldData]
                return newData
            })
        },
        onError: err => {
            console.log(err)
        }
    })
}

export default useCreateAnnouncement
