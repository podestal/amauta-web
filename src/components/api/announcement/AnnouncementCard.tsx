// import { useState } from "react"
import { RiGroup2Fill, RiSchoolFill, RiUserFill } from "@remixicon/react";
import { Announcement } from "../../../services/api/announcementService"
import { motion } from "framer-motion"
import moment from "moment"

interface Props {
    announcement: Announcement
}

const messageStyles = {
    I: "bg-blue-100 border-blue-500",
    A: "bg-yellow-100 border-yellow-500",
    E: "bg-red-100 border-red-500",
  };
  

const AnnouncementCard = ({ announcement }: Props) => {

    // const [show, setShow] = useState(false)
    // const toggleAnnouncement = () => setShow(!show)
    // const createdAt = moment(announcement.created_at).format('DD-MM-YYYY')

    // const user = useGetProfileStore(s => s.user)


  return (
    <motion.div
        className={`relative p-3 my-4 border-l-4 rounded-lg shadow-sm ${messageStyles[announcement.announcement_type as keyof typeof messageStyles]}`}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.02 }}
        >
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg text-slate-950 font-semibold">{announcement.title}</h3>
          {announcement.visibility_level === 'G' && <RiSchoolFill className="text-xl text-slate-950" />}
          {announcement.visibility_level === 'C' &&<RiGroup2Fill className="text-xl text-slate-950" />}
          {announcement.visibility_level === 'P' &&<RiUserFill className="text-xl text-slate-950" />}
        </div>
        
        <p className="text-sm text-gray-800">{announcement.description}</p>
        <div className="text-xs text-gray-500 flex justify-between mt-4">
            <span>Autor: {announcement.author}</span>
            <span>{moment(announcement.created_at).format('DD/MM/YYYY')}</span>
        </div>
    </motion.div>

  )
}

export default AnnouncementCard