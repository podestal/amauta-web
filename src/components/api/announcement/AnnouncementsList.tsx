import useGetAnnouncements from "../../../hooks/api/announcement.ts/useGetAnnouncements"
import useAuthStore from "../../../hooks/store/useAuthStore"
import { Student } from "../../../services/api/studentsService"

interface Props {
    student: Student
    open: boolean
}

const AnnouncementsList = ({ student, open }: Props) => {
    
    const access = useAuthStore(s => s.access) || ''
    const { data: announcements, isLoading, isError, error, isSuccess } = useGetAnnouncements({ access, studentId: student.uid, enable: open })
    
    if (isLoading) return <p>Loading...</p>

    if (isError) return <p>{error?.message}</p>

    if (isSuccess)

  return (
    <div>
        {announcements.map(announcement => (
            <div key={announcement.id} className="w-full flex flex-col gap-2">
                <h3 className="text-lg">{announcement.title}</h3>
                <p className="text-sm">{announcement.description}</p>
            </div>
        ))}
    </div>
  )
}

export default AnnouncementsList