import { useEffect } from "react"
import Clasrooms from "../components/api/ClassRooms/Clasrooms"
import useGetInstructor from "../hooks/api/instructor/useGetInstructor"
import useInstructorStore from "../hooks/store/useInstructorStore"
import useAuthStore from "../hooks/store/useAuthStore"
import useLoader from "../hooks/ui/useLoader"

const StudentsPage = () => {

    const access = useAuthStore(s => s.access) || ''
    const {data: instructor, isLoading, isError, error, isSuccess} = useGetInstructor({ access })
    const setInstructor = useInstructorStore(s => s.setInstructor)

    useEffect(() => {
        instructor && setInstructor(instructor)
    }, [instructor, setInstructor])

    useLoader(isLoading)

    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess)

  return (
    <Clasrooms />
  )
}

export default StudentsPage