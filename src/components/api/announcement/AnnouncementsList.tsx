import useGetAnnouncements from "../../../hooks/api/announcement.ts/useGetAnnouncements"
import useAuthStore from "../../../hooks/store/useAuthStore"
import useLanguageStore from "../../../hooks/store/useLanguageStore"
import { Student } from "../../../services/api/studentsService"
import AnnouncementCard from "./AnnouncementCard"
import { motion } from "framer-motion"

interface Props {
    student: Student
    open: boolean
}

const AnnouncementsList = ({ student, open }: Props) => {

    const lan = useLanguageStore(s => s.lan)
    const access = useAuthStore(s => s.access) || ''
    const { data: announcements, isLoading, isError, error, isSuccess } = useGetAnnouncements({ access, studentId: student.uid, enable: open })
    
    if (isLoading) return <p>Loading...</p>

    if (isError) return <p>{error?.message}</p>

    if (isSuccess)

  return (
    <motion.div
        initial={{ y: "-100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }}
    >
        {announcements.length === 0 
        ? 
        <h2 className="text-center text-2xl my-6">{lan === 'EN' ? 'No Announcements ...' : 'Sin Mensajes ...'}</h2> 
        : 
        <>
        {announcements.map(announcement => (
            <AnnouncementCard 
                key={announcement.id}
                announcement={announcement}
            />
        ))}
        </>}
    </motion.div>
  )
}

export default AnnouncementsList