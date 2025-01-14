import { Outlet } from "react-router-dom"
import NotificationCard from "../components/ui/NotificationCard"
import useNotificationsStore from "../hooks/store/useNotificationsStore"
import Navigator from "../router/Navigator"
import useAuthStore from "../hooks/store/useAuthStore"
import useLoadingStore from "../hooks/store/useLoadingStore"
import Loader from "../components/ui/Loader"
import { useEffect } from "react"
import useGetProfileStore from "../hooks/store/useGetProfileStore"

const MainPage = () => {

    const { type, message, reset, show } = useNotificationsStore()
    const isLoading = useLoadingStore(s => s.isLoading)
    const access = useAuthStore(s => s.access)
    const profile = useGetProfileStore(s => s.profile)

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
        <div className="min-h-screen">
          <Outlet />
        </div>
        {profile && access && <Navigator />}
    </div>
  )
}

export default MainPage