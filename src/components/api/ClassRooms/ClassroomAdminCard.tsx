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
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0 }}
        layout
        className="relative flex flex-col gap-4 bg-gray-800 p-4 rounded-2xl hover:bg-gray-700 cursor-pointer border-l-8 border-blue-600">
        <h3 className="font-bold">{getClassroomDescription({ lan:'ES', grade: classroom.grade, section:classroom.section, level: classroom.level, short: true, noLevel:true})}</h3>
        {/* <p>{classroom.students.length} Alumnos</p> */}
        <div className="flex flex-col gap-1">
            <p className="text-xs text-slate-300">Alumnos: {classroom.total_students}</p>
            <p className="text-xs text-slate-300">Instructores: -</p>
        </div>
        <RemoveClassroom classroom={classroom} />
    </motion.div>
  )
}

export default ClassroomAdminCard