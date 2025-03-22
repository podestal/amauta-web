import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getAnnouncementService, { Announcement, AnnouncementCreateUpdate } from "../../../services/api/announcementService"

export interface CreateAnnouncementData {
    access: string
    announcement: AnnouncementCreateUpdate
}

interface Props {
    studentId?: string
    school: string
    page?: string
}

const useCreateAnnouncement = ({ studentId, school, page='1' }: Props): UseMutationResult<Announcement, Error, CreateAnnouncementData> => {
    console.log('studentId', studentId);
    const announcementService = getAnnouncementService({})
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: CreateAnnouncementData) => announcementService.post(data.announcement, data.access),
        onSuccess: res => {
            queryClient.setQueryData<Announcement[]>([`announcements admin ${school} ${page}`,], oldData => {
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
