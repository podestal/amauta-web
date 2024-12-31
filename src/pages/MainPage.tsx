import { Outlet } from "react-router-dom"
import NotificationCard from "../components/ui/NotificationCard"
import useNotificationsStore from "../hooks/store/useNotificationsStore"
import Navigator from "../router/Navigator"
import useAuthStore from "../hooks/store/useAuthStore"
import useLoadingStore from "../hooks/store/useLoadingStore"
import Loader from "../components/ui/Loader"

const MainPage = () => {

    const { type, message, reset, show } = useNotificationsStore()
    const isLoading = useLoadingStore(s => s.isLoading)
    const access = useAuthStore(s => s.access)

  return (
    <div className="min-h-screen dark:bg-slate-950 dark:text-slate-50 mx-auto relative">
        {show && 
        <NotificationCard 
            type={type}
            message={message}
            reset={reset}
        />}
        {isLoading && <Loader />}
        <div className="w-full min-h-screen max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1280px] mx-auto overflow-hidden">
          <Outlet />
        </div>
        {access && <Navigator />}
    </div>
  )
}

export default MainPage