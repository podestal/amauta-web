import moment from "moment"
import useAuthStore from "../../../../hooks/store/useAuthStore"
import { StudentByAgendas } from "../../../../services/api/studentsService"
import useGetAnnouncementsByDate from "../../../../hooks/api/announcement.ts/useGetAnnouncementsByDate"
import { motion } from "framer-motion"
import AnnouncementCard from "../../announcement/AnnouncementCard"
import StudentMarkContacted from "./StudentMarkContacted"

interface Props {
    student: StudentByAgendas
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    classroom: string
}

const StudentAgendaContent = ({ student, open, setOpen, classroom }: Props) => {
    // useGetAnnouncementsByDate({ access, student: studentId, enable: true, date: selectedDate })
    const access = useAuthStore(s => s.access) || ''
    const currentDate = moment().format('YYYY-MM-DD')
    const { data: announcements, isLoading, isError, error, isSuccess } = useGetAnnouncementsByDate({ access, student: (student.uid).toString(), enable: open, date: currentDate })

    if (isLoading) return <p className="text-center animate-pulse my-8">Cargando...</p>

    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess) 


  return (
    <motion.div
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.1 }}
        className="w-[90%] mx-auto p-6 h-[600px] bg-slate-800 rounded-lg shadow-2xl overflow-scroll"
    >
        <h2 className="text-lg font-semibold my-2">Agenda: {student.first_name} {student.last_name}</h2>
        <p className="mb-4">Contacto: {student.tutor_phone}</p>
        <StudentMarkContacted 
            student={student} 
            classroom={classroom}
            setOpen={setOpen}
        />

        {announcements.length > 0 
        ? 
        <>
        {announcements.map(announcement => (
            <AnnouncementCard 
                key={announcement.id} 
                announcement={announcement} 
            />
        ))}
        </> 
        : 
        <h2 className="my-6 font-semibold">No se encontraron anuncios ...</h2>}

    </motion.div>
  )
}

export default StudentAgendaContent