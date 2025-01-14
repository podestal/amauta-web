import APIClient from "./apiClient"

export interface Announcement {
    id: string
    title: string
    description: string
    created_at: string
    created_by: string
    student: string
}

export type AnnouncementCreateUpdate = Omit<Announcement, 'id' | 'created_at' | 'created_by'> & {
    created_by?: string
}

interface Props {
    byStudent?: boolean
    byTutor? : boolean
}

const getAnnouncementService = ({ byStudent, byTutor }: Props) => {
    let url = `announcement/`
    if (byStudent) {
        url = `announcement/byStudent/`
    } else if (byTutor) {
        url = `announcement/byTutor/`
    }
    
    return new APIClient<Announcement, AnnouncementCreateUpdate>(url)
}

export default getAnnouncementService
