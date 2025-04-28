import { useQueryClient } from "@tanstack/react-query"
import useAuthStore from "../../hooks/store/useAuthStore"
import Button from "../ui/Button"
import { useNavigate } from "react-router-dom"
import useLanguageStore from "../../hooks/store/useLanguageStore"
import { LogOut } from "lucide-react"

interface Props {
  icon?: boolean
  isOpen?: boolean
}

const Logout = ({ icon, isOpen }: Props) => {

    const clearTokens = useAuthStore(s => s.clearTokens)
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const lan = useLanguageStore(s => s.lan)

    const handleLogout = () => {
        clearTokens()
        queryClient.clear()
        navigate('/')
    }

  return (
    <div>
      {icon 
      ? 
      <div 
        onClick={handleLogout}
        className="dark:text-slate-300 transition m-2 px-2 flex gap-2 items-center cursor-pointer dark:hover:text-red-600 hover:text-red-500">
        <LogOut />
        {isOpen && <p>Salir</p>}
      </div>
      : 
      <Button 
        label={lan === 'EN' ? "Logout" : "Salir"}
        color="red"
        onClick={handleLogout}
      />
      }
 
        
    </div>
  )
}

export default Logout