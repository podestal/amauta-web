import { motion } from "framer-motion"
import ClassroomAssignaturesList from "./ClassroomAssignaturesList"

const AssignaturesAdmin = () => {
  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full mx-auto px-4 py-6 text-gray-800 dark:text-gray-100">
        <h2 className="text-2xl font-bold mb-4">Clases</h2>
        <ClassroomAssignaturesList />
    </motion.div>
  )
}

export default AssignaturesAdmin