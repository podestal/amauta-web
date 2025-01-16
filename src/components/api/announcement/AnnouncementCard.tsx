import { useState } from "react"
import { Announcement } from "../../../services/api/announcementService"
import { motion } from "framer-motion"
import { RiArrowUpDoubleFill } from "@remixicon/react"
import moment from "moment"

interface Props {
    announcement: Announcement
}

const AnnouncementCard = ({ announcement }: Props) => {

    const [show, setShow] = useState(false)
    const toggleAnnouncement = () => setShow(!show)
    const createdAt = moment(announcement.created_at).format('DD-MM-YYYY')

    console.log('announcement', announcement)
    

    const itemVariants = {
        hidden: { opacity: 0, x: 50 }, 
        visible: { opacity: 1, x: 0 }, 
      };

  return (
    <motion.div 
        variants={itemVariants}
        className="w-full flex flex-col gap-2">
        <div className="w-full flex justify-between items-start">
            <div className="flex flex-col gap-1">
                <h3 className="text-xl">De: {announcement.created_by}</h3>
                <h3 className="text-md text-slate-300">Asunto: {announcement.title}</h3>
            </div>
            <motion.div
                className="cursor-pointer dark:hover:text-neutral-400 hover:text-slate-800"
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
            <p className="text-xs mt-2 text-right dark:text-slate-300">{createdAt}</p>
        </motion.div>
    </motion.div>
  )
}

export default AnnouncementCard