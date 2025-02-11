import { useState } from "react"
import { Announcement } from "../../../services/api/announcementService"
import { motion } from "framer-motion"
import { RiArrowUpDoubleFill } from "@remixicon/react"
import moment from "moment"
import useGetProfileStore from "../../../hooks/store/useGetProfileStore"

interface Props {
    announcement: Announcement
}

const AnnouncementCard = ({ announcement }: Props) => {

    const [show, setShow] = useState(false)
    const toggleAnnouncement = () => setShow(!show)
    const createdAt = moment(announcement.created_at).format('DD-MM-YYYY')

    const user = useGetProfileStore(s => s.user)

    console.log('announcement', announcement)


  return (
    <div 
        className="w-full flex flex-col gap-4">
        <div className="w-full flex justify-between items-start">
            {user?.groups[0] === 'tutor' ? 
            <div className="flex flex-col gap-1">
                <h3 className="text-xl">De: {announcement.created_by}</h3>
                <h3 className="text-md text-slate-300">Asunto: {announcement.title}</h3>
            </div>
            :
            <h3 className="text-md text-slate-300">Asunto: {announcement.title}</h3>
            }
            <motion.div
                className="cursor-pointer hover:text-neutral-400"
                onClick={toggleAnnouncement}
                animate={{ rotate: show ? 180 : 0 }} 
                transition={{ duration: 0.3 }}
            >
                <RiArrowUpDoubleFill />
            </motion.div>
        </div>
        <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
            height: show ? "auto" : 0,
            opacity: show ? 1 : 0,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <p className="text-xs">{announcement.description}</p>
            <p className="text-xs mt-2 text-right text-slate-300">{createdAt}</p>
        </motion.div>
    </div>
  )
}

export default AnnouncementCard