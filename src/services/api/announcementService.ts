import APIClient from "./apiClient"

export interface Announcement {
    id: string
    title: string
    description: string
    created_at: string
    student: string
}

export type AnnouncementCreateUpdate = Omit<Announcement, 'id' | 'created_at'>

interface Props {
    byStudent?: boolean
}

const getAnnouncementService = ({ byStudent }: Props) => {
    const URL = byStudent ? `announcement/byStudent/`:  `announcement/`
    return new APIClient<Announcement, AnnouncementCreateUpdate>(URL)
}

export default getAnnouncementService
