import { useState } from "react"
import useGetAnnouncementsAdmin from "../../../hooks/api/announcement.ts/useGetAnnouncementsAdmin"
import useAuthStore from "../../../hooks/store/useAuthStore"
import useSchoolStore from "../../../hooks/store/useSchoolStore"
import AnnouncementsLastTen from "./AnnouncementsLastTen"
import AnnouncementsSummary from "./AnnouncementsSummary"
import CreateAnnouncementAdmin from "./CreateAnnouncementAdmin"


const AnnouncementsAdminList = () => {

    const school = useSchoolStore(s => s.school).id.toString()
    const access = useAuthStore(s => s.access) || ''
    const [selectedType, setSelectedType] = useState('')
    const [selectedLevel, setSelectedLevel] = useState('')
    const [selectedPage, setSelectedPage] = useState(1)
    const { data: announcements, isLoading, isError, error, isSuccess } = useGetAnnouncementsAdmin({ school, access, page:(selectedPage).toString(), pageSize: '10' })
    if (isLoading) return <p>Loading...</p>

    if (isError) return <p>{error?.message}</p>

    if (isSuccess)

  return (
    <div className="flex flex-col gap-6">
    <CreateAnnouncementAdmin 
      selectedPage={selectedPage}
    />
    <div className="w-full grid grid-cols-3 gap-6">
        <AnnouncementsLastTen 
            announcements={announcements} 
            selectedType={selectedType}
            selectedLevel={selectedLevel}
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
        />
        <AnnouncementsSummary 
            announcements={announcements} 
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
        />
    </div>
    </div>
  )
}

export default AnnouncementsAdminList