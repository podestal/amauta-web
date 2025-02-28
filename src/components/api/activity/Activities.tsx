import { useLocation } from "react-router-dom"
import useGetActivitiesByAssignature from "../../../hooks/api/activity/useGetActivitiesByAssignature"
import useAuthStore from "../../../hooks/store/useAuthStore"
import useLoader from "../../../hooks/ui/useLoader"
import { motion } from "framer-motion"
import moment from "moment"
import ActivityCard from "./ActivityCard"
import CreateActivity from "./CreateActivity"

const Activities = () => {

    const access = useAuthStore(s => s.access) || ''
    const state = useLocation().state
    const { data: activities, isLoading, isError, error, isSuccess } = useGetActivitiesByAssignature({ access, assignatureId: state.assignatureId })

    useLoader(isLoading)

    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess)

  return (
    <div>
        <motion.div 
        className="w-full max-w-3xl mx-auto px-6 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        >
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">📌 Tareas Asignadas</h2>
            <CreateActivity 
                area={state.area}
                assignatureId={state.assignatureId}
            />
            {/* <CreateAssignment 
            setLocalAssignments={setLocalAssignments}
            assignatureId={assignatureId}
            area={area}
            /> */}
        </div>

        {activities.length > 0 ? (
            <ul className="space-y-4 pb-10">
            {activities
                .sort((a, b) => {
                const now = moment();
                const dueA = moment(a.due_date);
                const dueB = moment(b.due_date);
        
                const isPastA = dueA.isBefore(now, "day");
                const isPastB = dueB.isBefore(now, "day");
        
                if (isPastA && !isPastB) return 1; // Push past-due to bottom
                if (!isPastA && isPastB) return -1; // Keep upcoming at top
        
                return dueA.diff(dueB); // Sort by date
                })
                .map((assignment) => (
                    
                    <ActivityCard 
                        key={assignment.id} 
                        activity={assignment}
                        isPastDue={moment(assignment.due_date).isBefore(moment(), "day")}
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
            No hay actividades disponibles.
            </motion.p>
        )}
        </motion.div>
    </div>
  )
}

export default Activities