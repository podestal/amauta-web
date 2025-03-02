import { motion } from "framer-motion"
import useGetActivitiesByTutor from "../../../hooks/api/activity/useGetActivitiesByTutor"
import useAuthStore from "../../../hooks/store/useAuthStore"
import ActivityByTutorCard from "./ActivityByTutorCard"

interface Props {
    assignatureId: string
    studentUid: string
    show: boolean
    quarter: string
}

const ActivitiesByTutor = ({ assignatureId, studentUid, show, quarter }: Props) => {

    const access = useAuthStore((s) => s.access) || ""
    const { data: activities, isLoading, isError, error, isSuccess } = useGetActivitiesByTutor({ access, assignatureId, studentUid, show, quarter })

    if (isLoading) return <p className="animate-pulse text-center py-2">Un Momento ...</p>

    if (isError) return <p>Error {error.message}</p>

    if (isSuccess)

  return (
    <>
        {activities.length > 0 
        ? 
        <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.4 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg border-l-4 my-6"
        >
            <ul>
                {activities.map(activity => (
                    <ActivityByTutorCard 
                        key={activity.id}
                        activity={activity}
                    />
                ))}
            </ul>
        </motion.div>
        :
        <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.4 }}
            exit={{ height: 0, opacity: 0 }}
            
        >
            <p className="text-center p-4 font-bold">Aún no hay actividades</p>    
        </motion.div>}
    </>

  )
}

export default ActivitiesByTutor