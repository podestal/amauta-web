import { motion } from "framer-motion"
import { assignments } from "../../../data/mockdataForGrades"
import CreateAssignment from "./CreateAssignment"
import AssignmentCard from "./AssignmentCard"

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
          {filteredAssignments.map((assignment) => (
            <AssignmentCard 
                key={assignment.id}
                assignment={assignment}
            />
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