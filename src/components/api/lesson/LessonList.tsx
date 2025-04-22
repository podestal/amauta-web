import { Loader } from "lucide-react"
import useGetLessons from "../../../hooks/api/lesson/useGetLessons"
import useAuthStore from "../../../hooks/store/useAuthStore"

const LessonList = () => {

    const access = useAuthStore(s => s.access) || ''
    const { data: lessons, isLoading, isError, error, isSuccess } = useGetLessons({ access })

    if (isLoading) return <Loader />

    if (isError) return <p>{error.message}</p>

    if (isSuccess)

  return (
    <div>
        <>{console.log('lessons', lessons)}</>
        {lessons.map( lesson => (
            <div key={lesson.id} className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold">{lesson.subject}</h2>
                {/* <p>{lesson.subject}</p>
                <p>{lesson.content}</p> */}
            </div>
        ))}
    </div>
  )
}

export default LessonList