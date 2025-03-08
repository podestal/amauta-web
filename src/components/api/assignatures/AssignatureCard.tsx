import { motion } from "framer-motion"
import { Assignature } from "../../../services/api/assignatureService"
import { useNavigate } from "react-router-dom"
import getClassroomDescription from "../../../utils/getClassroomDescription"

interface Props {
    assignature: Assignature
    icon: JSX.Element
    styles: string
    idx: number
}

const AssignatureCard = ({ assignature, icon, styles, idx }: Props) => {

    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate(`/app/assignatures/${assignature.id}`, { state: { area: assignature.area, assignatureId: assignature.id } })
    }
    const [grade, section, level] = assignature.classroom_description.split("-");
    const classRoomDescription = getClassroomDescription({ lan:'ES', grade, section, level, short: true });

  return (
    <motion.div
        key={assignature.id}
        onClick={handleNavigate}
        className={`p-6 rounded-xl shadow-xl ${styles} flex flex-col items-center justify-center text-xl font-semibold cursor-pointer transition-transform transform hover:scale-105`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: idx * 0.2 }}
    >
        <div className="text-4xl">{icon}</div>
        <p className="mt-4">{assignature.title}</p>
        <p className="text-sm">{classRoomDescription}</p>
  </motion.div>
  )
}

export default AssignatureCard