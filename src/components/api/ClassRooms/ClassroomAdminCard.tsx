import { motion } from "framer-motion"
import { Classroom } from "../../../services/api/classroomService"
import getClassroomDescription from "../../../utils/getClassroomDescription"
import RemoveClassroom from "./RemoveClassroom"

interface Props {
    classroom: Classroom
}

const ClassroomAdminCard = ({ classroom }: Props) => {
  return (
    <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        layout
        transition={{ duration: 0.5 }}
        className="relative flex flex-col gap-4 bg-gray-900 p-5 rounded-2xl border-l-8 border-blue-500/70 
                hover:bg-gray-800 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer"
    >
        {/* Title */}
        <h3 className="font-semibold text-white text-lg">
            {getClassroomDescription({ lan:'ES', grade: classroom.grade, section:classroom.section, level: classroom.level, short: true, noLevel:true })}
        </h3>

        {/* Student & Instructor Info */}
        <div className="flex flex-col gap-1 text-sm">
            <p className="text-gray-400">👩‍🎓 Alumnos: <span className="font-medium text-gray-300">{classroom.total_students}</span></p>
            <p className="text-gray-400">📚 Instructores: <span className="italic text-gray-500">-</span></p>
        </div>

        {/* Remove Button */}
        <RemoveClassroom classroom={classroom} />
    </motion.div>

  )
}

export default ClassroomAdminCard