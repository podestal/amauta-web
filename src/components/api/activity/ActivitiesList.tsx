import moment from "moment";
import ActivityCard from "./ActivityCard";
import { motion } from "framer-motion";
import useAuthStore from "../../../hooks/store/useAuthStore";
import useLoader from "../../../hooks/ui/useLoader";
import useGetActivitiesByAssignature from "../../../hooks/api/activity/useGetActivitiesByAssignature";
import useGetActivitiesByLesson from "../../../hooks/api/activity/useGetActivitiesByLesson";

interface Props {
    assignatureId: string
    quarter: string
    area: string
    classroom: string
    lessonId?: number
    descriptionAi?: boolean
}

const ActivitiesList = ({ assignatureId, quarter, area, classroom, lessonId }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const { data: activities, isLoading, isError, error, isSuccess } = lessonId ? useGetActivitiesByLesson({access, lessonId: lessonId.toString()}) : useGetActivitiesByAssignature({ access, assignatureId, quarter })

    !lessonId && useLoader(isLoading)

    if (isLoading) return <p className="animate-pulse text-center">Cargando...</p>

    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess)

  return (
    <>
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
            .sort((a, b) => a.id + b.id)
            .map((assignment) => (
                
                <ActivityCard 
                    key={assignment.id} 
                    activity={assignment}
                    isPastDue={moment(assignment.due_date).isBefore(moment(), "day")}
                    assignatureId={assignatureId}
                    area={area}
                    classroom={classroom}
                    descriptionAi
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
    </>
  )
}

export default ActivitiesList