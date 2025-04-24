import { Loader } from "lucide-react"
import useGetLessons from "../../../hooks/api/lesson/useGetLessons"
import useAuthStore from "../../../hooks/store/useAuthStore"
import LessonCard from "./LessonCard"

interface Props {
  classroom: string
}

const LessonList = ({ classroom }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const { data: lessons, isLoading, isError, error, isSuccess } = useGetLessons({ access })

    if (isLoading) return <Loader />

    if (isError) return <p>{error.message}</p>

    if (isSuccess)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
        {lessons.map( lesson => (
            <LessonCard key={lesson.id} lesson={lesson} classroom={classroom} />
        ))}
    </div>
  )
}

export default LessonList