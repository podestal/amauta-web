import { Loader } from "lucide-react"
import useAuthStore from "../../../hooks/store/useAuthStore"
import LessonCard from "./LessonCard"
import useGetLessonsByAssignature from "../../../hooks/api/lesson/useGetLessonByAssignature"
import { useLocation } from "react-router-dom"

interface Props {
  classroom: string
  assignature: string
  area: string
}

const LessonList = ({ classroom, assignature, area }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const assignatureId = assignature || useLocation().state?.assignature
    console.log('assignatureId', assignatureId)
    
    const { data: lessons, isLoading, isError, error, isSuccess } = useGetLessonsByAssignature({ access, assignatureId })

    if (isLoading) return <Loader />

    if (isError) return <p>{error.message}</p>

    if (isSuccess)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
        {lessons.map( lesson => (
            <LessonCard key={lesson.id} lesson={lesson} classroom={classroom} assignature={assignature} area={area} />
        ))}
    </div>
  )
}

export default LessonList