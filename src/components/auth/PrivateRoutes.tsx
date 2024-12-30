import useAuthStore from "../../hooks/store/useAuthStore"
import { Navigate } from "react-router-dom"

interface Props {
    children: React.ReactElement
}

const PrivateRoutes = ({ children }: Props) => {

    const access = useAuthStore(s => s.access)

    return access ? children : <Navigate to="/login" replace />

}

export default PrivateRoutes