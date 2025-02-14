import { motion } from "framer-motion"
import { assignments, Assignment } from "../../../data/mockdataForGrades"
import CreateAssignment from "./CreateAssignment"
import AssignmentCard from "./AssignmentCard"
import { useState } from "react"
import moment from "moment"

interface Props {
    assignatureId: number
    area: number
}

const Assignments = ({ assignatureId, area }: Props) => {

    const filteredAssignments = assignments.filter(assignment => assignment.assignatureId === assignatureId)
    const [localAssignments, setLocalAssignments] = useState<Assignment[]>(filteredAssignments)

    console.log('localAssignments', localAssignments)
    

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
          setLocalAssignments={setLocalAssignments}
          assignatureId={assignatureId}
          area={area}
        />
      </div>

      {localAssignments.length > 0 ? (
        <ul className="space-y-4">
          {localAssignments
            .sort((a, b) => {
              const now = moment();
              const dueA = moment(a.dueDate);
              const dueB = moment(b.dueDate);
    
              const isPastA = dueA.isBefore(now, "day");
              const isPastB = dueB.isBefore(now, "day");
    
              if (isPastA && !isPastB) return 1; // Push past-due to bottom
              if (!isPastA && isPastB) return -1; // Keep upcoming at top
    
              return dueA.diff(dueB); // Sort by date
            })
            .map((assignment) => (
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