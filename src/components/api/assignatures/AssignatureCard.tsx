import { motion } from "framer-motion"
import { Assignature } from "./Assignatures"
import { useNavigate } from "react-router-dom"

interface Props {
    assignature: Assignature
}

const AssignatureCard = ({ assignature }: Props) => {

    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate(`/app/assignature/${assignature.id}`)
    }

  return (
    <motion.div
        key={assignature.id}
        onClick={handleNavigate}
        className={`p-6 rounded-xl shadow-xl ${assignature.color} ${assignature.textColor} ${assignature.hoverColor } flex flex-col items-center justify-center text-xl font-semibold cursor-pointer transition-transform transform hover:scale-105`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: assignature.id * 0.2 }}
    >
        <div className="text-4xl">{assignature.icon}</div>
        <p className="mt-4">{assignature.name}</p>
  </motion.div>
  )
}

export default AssignatureCard