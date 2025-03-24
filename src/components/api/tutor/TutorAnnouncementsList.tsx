import { motion } from "framer-motion"
import useGetAnnouncementsByDate from "../../../hooks/api/announcement.ts/useGetAnnouncementsByDate"
import useAuthStore from "../../../hooks/store/useAuthStore"
import useLoader from "../../../hooks/ui/useLoader"
import AnnouncementCard from "../announcement/AnnouncementCard"

interface Props {
    studentId: string
    selectedDate: string
}

const TutorAnnouncementsList = ({ studentId, selectedDate }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const {data: announcements, isLoading, isError, error, isSuccess} = useGetAnnouncementsByDate({ access, student: studentId, enable: true, date: selectedDate })

    useLoader(isLoading)

    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess)
  return (

    <div>
         {/* <h2 className="text-3xl text-center font-bold">{lan === 'EN' ? 'No Announcements' : 'Sin Anuncios'}</h2> */}
        {/* <>{console.log('announcements', announcements)}</> */}
        {announcements.length === 0 
        ? 
        <h2 className="lg:text-3xl text-center font-bold bg-slate-800 px-8 py-4 rounded-2xl mx-8">Sin Anuncios</h2> 
        : 
        <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.1 }}
            className="w-[90%] mx-auto p-6 h-[600px] bg-slate-800 rounded-lg shadow-2xl overflow-scroll"
          >
            {announcements.map(announcement => (
              <AnnouncementCard 
                key={announcement.id} 
                announcement={announcement} 
              />
            ))}
        </motion.div> }   
    </div>
  )
}

export default TutorAnnouncementsList