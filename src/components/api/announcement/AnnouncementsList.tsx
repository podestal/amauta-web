import { useState } from "react"
import useGetAnnouncementsByDate from "../../../hooks/api/announcement.ts/useGetAnnouncementsByDate"
import useAuthStore from "../../../hooks/store/useAuthStore"
import useLanguageStore from "../../../hooks/store/useLanguageStore"
import { Student } from "../../../services/api/studentsService"
import AnnouncementCard from "./AnnouncementCard"
import { motion } from "framer-motion"
import moment from "moment"

interface Props {
    student: Student
    open: boolean
}

const AnnouncementsList = ({ student, open }: Props) => {

    const lan = useLanguageStore(s => s.lan)
    const access = useAuthStore(s => s.access) || ''
    const [selectedDate, setSelectedDate] = useState<string>(moment().format('YYYY-MM-DD'))
    console.log('setSelectedDate', setSelectedDate);
    
    const { data: announcements, isLoading, isError, error, isSuccess } = useGetAnnouncementsByDate({ date: selectedDate, student: student.uid, access, enable: open })
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
        <motion.div
            className="bg-slate-800 shadow-lg rounded-2xl p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
        >
        <h2 className="text-xl mb-8 text-center font-bold">Agenda {moment().format('DD/MM/YYYY')}</h2>
        {announcements.map(announcement => (
            <AnnouncementCard 
                key={announcement.id}
                announcement={announcement}
            />
        ))}
        </motion.div>}
    </motion.div>
  )
}

export default AnnouncementsList