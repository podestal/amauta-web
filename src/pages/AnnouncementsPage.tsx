import { motion } from "framer-motion"
import AnnouncementCard from "../components/api/announcement/AnnouncementCard"
import useAuthStore from "../hooks/store/useAuthStore"
import useLanguageStore from "../hooks/store/useLanguageStore"
import useLoader from "../hooks/ui/useLoader"
import { useLocation } from "react-router-dom"
import { useState } from "react"
import moment from "moment"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import useGetAnnouncementsByDate from "../hooks/api/announcement.ts/useGetAnnouncementsByDate"
import { daysInSpanish, monthInSpanish } from "../components/api/reports/attendance/tables/DailyAttendanceReportHeader"

const AnnouncementsPage = () => {

    const access = useAuthStore(s => s.access) || ''

    const {studentUid: studentId} = useLocation().state
    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'))
    const {data: announcements, isLoading, isError, error, isSuccess} = useGetAnnouncementsByDate({ access, student: studentId, enable: true, date: selectedDate })
    const lan = useLanguageStore(s => s.lan)

    const changeDate = (days: number) => {
      setSelectedDate((prev) => moment(prev).add(days, "days").format("YYYY-MM-DD"));
    };

    useLoader(isLoading)

    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess)

  return (
    <div className="w-full min-h-screen max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1280px] mx-auto overflow-hidden h-screen pt-20">
        <h2 className="text-3xl text-center font-bold mb-6">Agenda </h2>
        <div className="grid grid-cols-6 w-full gap-8 p-4 mb-8 bg-white shadow-lg rounded-2xl mx-auto text-center">
          <div 
            className="mx-auto"
            onClick={() => changeDate(-1)}>
            <ChevronLeft className="w-5 h-5 text-blue-500 hover:text-blue-600 cursor-pointer flex items-center" />
          </div>

          <div className="col-span-4 flex items-center justify-center gap-2 text-lg font-semibold text-gray-700">
            <Calendar className="w-5 h-5 text-blue-500" />
            {daysInSpanish[moment(selectedDate).format("ddd")] + ' ' + moment(selectedDate).format("DD") + ' de ' + monthInSpanish[moment(selectedDate).format("M")]}
          </div>

          <div 
            className="mx-auto"
            onClick={() => changeDate(1)}>
            <ChevronRight className="w-5 h-5 text-blue-500 hover:text-blue-600 cursor-pointer flex items-center" />
          </div>
        </div>
        {announcements.length === 0 
        ? 
        <h2 className="text-3xl text-center font-bold">{lan === 'EN' ? 'No Announcements' : 'Sin Mensajes'}</h2> 
        : 
        <div
        
        >
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
          </motion.div>

        </div>
        }
    </div>
  )
}

export default AnnouncementsPage