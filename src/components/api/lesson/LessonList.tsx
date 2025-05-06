import { Loader } from "lucide-react"
import useAuthStore from "../../../hooks/store/useAuthStore"
import LessonCard from "./LessonCard"
import useGetLessonsByAssignature from "../../../hooks/api/lesson/useGetLessonByAssignature"
import { useParams } from "react-router-dom"
import { motion } from "framer-motion"

interface Props {
  classroom: string
  assignature: string
  area: string
  quarter: string
}

const LessonList = ({ classroom, assignature, area, quarter }: Props) => {
    
    const access = useAuthStore(s => s.access) || ''
    const assignatureId = assignature || useParams().assignatureId || ''
    
    const { data: lessons, isLoading, isError, error, isSuccess } = useGetLessonsByAssignature({ access, assignatureId, quarter })

    if (isLoading) return <Loader />

    if (isError) return <p>{error.message}</p>

    if (isSuccess)

  return (

    <div>
      {lessons.length === 0 && 
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center text-gray-500 dark:text-gray-400">No hay lecciones disponibles</motion.p>}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
          {lessons.map( lesson => (
              <LessonCard 
                key={lesson.id} 
                lesson={lesson} 
                classroom={classroom} 
                assignature={assignatureId} 
                area={area} 
                quarter={quarter}  
              />
          ))}
      </div>
    </div>
  )
}

export default LessonList