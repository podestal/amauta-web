import { motion } from "framer-motion"
import { assignments } from "../../../data/mockdataForGrades"
import CreateAssignment from "./CreateAssignment"

interface Props {
    assignatureId: number
}

const Assignments = ({ assignatureId }: Props) => {

    const filteredAssignments = assignments.filter(assignment => assignment.assignatureId === assignatureId)

  return (
    <motion.div 
      className="w-full max-w-3xl mx-auto px-6 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">📌 Tareas Asignadas</h2>
        <CreateAssignment 
        
        />
      </div>

      {filteredAssignments.length > 0 ? (
        <ul className="space-y-4">
          {filteredAssignments.map((assignment, index) => (
            <motion.li
              key={assignment.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border-l-4 border-blue-500 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <h3 className="text-lg font-semibold">{assignment.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">{assignment.description}</p>
              <p className="text-sm text-gray-500 mt-2">📅 Fecha de entrega: {assignment.dueDate}</p>
            </motion.li>
          ))}
        </ul>
      ) : (
        <motion.p 
          className="text-gray-500 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          No hay asignaciones disponibles.
        </motion.p>
      )}
    </motion.div>
  )
}

export default Assignments