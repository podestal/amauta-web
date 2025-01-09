import { useQueryClient } from "@tanstack/react-query"
import useAuthStore from "../../hooks/store/useAuthStore"
import Button from "../ui/Button"
import { useNavigate } from "react-router-dom"
import useLanguageStore from "../../hooks/store/useLanguageStore"

const Logout = () => {

    const clearTokens = useAuthStore(s => s.clearTokens)
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const lan = useLanguageStore(s => s.lan)

    const handleLogout = () => {
        clearTokens()
        queryClient.clear()
        navigate('/login')
    }

  return (
    <div>
        <Button 
            label={lan === 'EN' ? "Logout" : "Salir"}
            color="red"
            onClick={handleLogout}
        />
    </div>
  )
}

export default Logout