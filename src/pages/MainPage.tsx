import { Outlet } from "react-router-dom"
import NotificationCard from "../components/ui/NotificationCard"
import useNotificationsStore from "../hooks/store/useNotificationsStore"
import Navigator from "../router/Navigator"
import useAuthStore from "../hooks/store/useAuthStore"
import useLoadingStore from "../hooks/store/useLoadingStore"
import Loader from "../components/ui/Loader"
import { useEffect } from "react"

const MainPage = () => {

    const { type, message, reset, show } = useNotificationsStore()
    const isLoading = useLoadingStore(s => s.isLoading)
    const access = useAuthStore(s => s.access)

    useEffect(() => {
      document.querySelector('html')?.classList.remove('dark')
    }, [])

  return (
    <div className="min-h-screen dark:bg-slate-950 dark:text-slate-50 bg-white text-black mx-auto relative">
        {show && 
        <NotificationCard 
            type={type}
            message={message}
            reset={reset}
        />}
        {isLoading && <Loader />}
        <Outlet />
        {access && <Navigator />}
    </div>
  )
}

export default MainPage