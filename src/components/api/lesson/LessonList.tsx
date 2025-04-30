import { Loader } from "lucide-react"
import useAuthStore from "../../../hooks/store/useAuthStore"
import LessonCard from "./LessonCard"
import useGetLessonsByAssignature from "../../../hooks/api/lesson/useGetLessonByAssignature"
import { useParams } from "react-router-dom"

interface Props {
  classroom: string
  assignature: string
  area: string
  quarter: string
}

const LessonList = ({ classroom, assignature, area, quarter }: Props) => {

    console.log('quarter', quarter);
    
    const access = useAuthStore(s => s.access) || ''
    const assignatureId = assignature || useParams().assignatureId || ''
    
    const { data: lessons, isLoading, isError, error, isSuccess } = useGetLessonsByAssignature({ access, assignatureId, quarter })

    if (isLoading) return <Loader />

    if (isError) return <p>{error.message}</p>

    if (isSuccess)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
        {lessons.map( lesson => (
            <LessonCard key={lesson.id} lesson={lesson} classroom={classroom} assignature={assignatureId} area={area} />
        ))}
    </div>
  )
}

export default LessonList