import useGetInstructor from "../../hooks/api/instructor/useGetInstructor"
import useAuthStore from "../../hooks/store/useAuthStore"
import { Navigate } from "react-router-dom"
import useInstructorStore from "../../hooks/store/useInstructorStore"
import { useEffect } from "react"
import useLoader from "../../hooks/ui/useLoader"

interface Props {
    children: React.ReactElement
}

const PrivateRoutes = ({ children }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const {data: instructor, isLoading, isError, error, isSuccess} = useGetInstructor({ access })
    const setInstructor = useInstructorStore(s => s.setInstructor)

    useEffect(() => {
        instructor && setInstructor(instructor)
    }, [instructor, setInstructor])

    useLoader(isLoading)

    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess)

    return access ? children : <Navigate to="/login" replace />

}

export default PrivateRoutes