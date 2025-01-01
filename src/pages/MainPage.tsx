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

    //   useEffect(() => {
    //   if (theme === 'dark') {
    //     document.querySelector('html')?.classList.add('dark')
    //     // document.querySelector('html')?.style('background-color: rgb(2 6 23);')
    //   } else {
    //     document.querySelector('html')?.classList.remove('dark')
    //   }
    // }, [theme])

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
        <div className="w-full min-h-screen max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1280px] mx-auto overflow-hidden">
          <Outlet />
        </div>
        {access && <Navigator />}
    </div>
  )
}

export default MainPage