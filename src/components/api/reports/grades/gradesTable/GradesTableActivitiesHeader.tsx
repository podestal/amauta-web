import { motion } from "framer-motion"
import useGetActivitiesByAssignature from "../../../../../hooks/api/activity/useGetActivitiesByAssignature"
import useAuthStore from "../../../../../hooks/store/useAuthStore"
import useLoader from "../../../../../hooks/ui/useLoader"

interface Props {
    assignatureId: string
    competence: string
}

const GradesTableActivitiesHeader = ({ assignatureId, competence }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const { data: activities, isLoading, isError, error, isSuccess } = useGetActivitiesByAssignature({ access, assignatureId, competence })

    useLoader(isLoading)

    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess)

  return (
    <motion.div 
      className="w-full min-w-max border-collapse bg-white dark:bg-gray-900 shadow-md rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
        <div className="flex items-center bg-gray-800 text-white font-bold h-[100px]">
            <h2 className="min-w-[200px] max-w-[200px] py-3 px-4">DNI</h2>
            <h2 className="min-w-[360px] max-w-[360px] py-3 px-4">Nombres</h2>
            <h2 className="min-w-[160px] max-w-[160px] py-3 px-4 text-center">Promedio</h2>
            {activities
            // .filter(assignment => selectedCategory === '0' || assignment.categoryId.toString() === selectedCategory)
            .sort((a, b) => a.id - b.id)
            .map((activity) => (
                <h2 
                    key={activity.id} 
                    className="min-w-[160px] max-w-[160px] py-3 px-4 text-center"
                >
                    {activity.title}
                </h2>
            ))}
        </div>

    </motion.div>

  )
}

export default GradesTableActivitiesHeader