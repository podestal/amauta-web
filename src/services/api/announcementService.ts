import APIClient from "./apiClient"

export interface Announcement {
    id: string
    title: string
    description: string
    created_at: string
    student: number
}

export type AnnouncementCreateUpdate = Omit<Announcement, 'id' | 'created_at'>

interface Props {
    announcementId?: string
}

const getAnnouncementService = ({ announcementId }: Props) => {
    const URL = announcementId ? `announcement/${announcementId}/` : `announcement/`
    return new APIClient<Announcement, AnnouncementCreateUpdate>(URL)
}

export default getAnnouncementService
