import { motion } from "framer-motion"
import useGetActivitiesByAssignature from "../../../../../hooks/api/activity/useGetActivitiesByAssignature"
import useAuthStore from "../../../../../hooks/store/useAuthStore"
import useLoader from "../../../../../hooks/ui/useLoader"
import Input from "../../../../ui/Input"

interface Props {
    assignatureId: string
    competence: string
    quarter: string
    category: string
    filterByName: string
    setFilterByName: React.Dispatch<React.SetStateAction<string>>
}

const GradesTableActivitiesHeader = ({ assignatureId, competence, quarter, category, filterByName, setFilterByName }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const { data: activities, isLoading, isError, error, isSuccess } = useGetActivitiesByAssignature({ access, assignatureId, competence, quarter })

    useLoader(isLoading)

    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess)

  return (
    <motion.div 
      className="w-full min-w-max border-collapse bg-white dark:bg-gray-900 shadow-md rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
        <div className="pb-10 bg-gray-950">
            <Input 
                placeholder="Buscar por nombre..."
                onChange={e => {
                    setFilterByName(e.target.value)
                }}
                value={filterByName}
            />
        </div>
        <div className="flex items-center bg-gray-800 text-white font-bold h-[100px]">
            <h2 className="min-w-[200px] max-w-[200px] py-3 px-4">DNI</h2>
            <h2 className="min-w-[360px] max-w-[360px] py-3 px-4">Nombres</h2>
            {category === '0' && <h2 className="min-w-[160px] max-w-[160px] py-3 px-4 text-center">Promedio</h2>}
            {activities
            .filter(assignment => category === '0' || assignment.category.toString() === category)
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