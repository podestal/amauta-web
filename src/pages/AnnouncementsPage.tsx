import { motion } from "framer-motion"
import AnnouncementCard from "../components/api/announcement/AnnouncementCard"
import useGetAnnouncements from "../hooks/api/announcement.ts/useGetAnnouncements"
import useAuthStore from "../hooks/store/useAuthStore"
import useLanguageStore from "../hooks/store/useLanguageStore"
import useLoader from "../hooks/ui/useLoader"

const AnnouncementsPage = () => {

    const access = useAuthStore(s => s.access) || ''
    const {data: announcements, isLoading, isError, error, isSuccess} = useGetAnnouncements({ access, enable: true, byTutor: true })
    const lan = useLanguageStore(s => s.lan)

    useLoader(isLoading)

    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess)

  return (
    <div className="w-full min-h-screen max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1280px] mx-auto overflow-hidden h-screen pt-20">

        {announcements.length === 0 
        ? 
        <h2 className="text-3xl text-center font-bold">{lan === 'EN' ? 'No Announcements' : 'Sin Mensajes'}</h2> 
        : 
        <div
        
        >
          <h2 className="text-2xl text-center font-bold mb-10">Anuncios</h2>
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.1 }}
          >
            {announcements.map(announcement => (
              <AnnouncementCard 
                key={announcement.id} 
                announcement={announcement} 
              />
            ))}
          </motion.div>

        </div>
        }
    </div>
  )
}

export default AnnouncementsPage