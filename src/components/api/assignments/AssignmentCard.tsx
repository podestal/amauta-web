import { motion } from "framer-motion"
import { Assignment } from "../../../data/mockdataForGrades"
import { useNavigate } from "react-router-dom"


interface Props {
    assignment: Assignment
}

const AssignmentCard = ({ assignment }: Props) => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/app/grades/${assignment.id}`)
    }

  return (
    <motion.li
            key={assignment.id}
            onClick={handleClick}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border-l-4 border-blue-500 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
        >
            <h3 className="text-lg font-semibold">{assignment.name}</h3>
            <p className="text-gray-600 dark:text-gray-300">{assignment.description}</p>
            <p className="text-sm text-gray-500 mt-2">📅 Fecha de entrega: {assignment.dueDate}</p>
    </motion.li>
  )
}

export default AssignmentCard