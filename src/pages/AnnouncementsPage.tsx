import { useLocation } from "react-router-dom"
import TutorAnnouncements from "../components/api/tutor/TutorAnnouncements"

const AnnouncementsPage = () => {

    const {studentUid: studentId} = useLocation().state

  return (
    <div className="w-full min-h-screen max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1280px] mx-auto overflow-scroll h-screen pt-20">
        <h2 className="text-3xl text-center font-bold mb-6">Agenda </h2>
        <TutorAnnouncements studentId={studentId} />
    </div>
  )
}

export default AnnouncementsPage