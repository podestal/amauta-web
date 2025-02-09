import { Outlet } from "react-router-dom"
import NotificationCard from "../components/ui/NotificationCard"
import useNotificationsStore from "../hooks/store/useNotificationsStore"
import Navigator from "../router/Navigator"
import useAuthStore from "../hooks/store/useAuthStore"
import useLoadingStore from "../hooks/store/useLoadingStore"
import Loader from "../components/ui/Loader"
import { useEffect } from "react"
import useGetProfileStore from "../hooks/store/useGetProfileStore"
import SideBar from "../router/SideBar"
import WebNavigator from "../router/WebNavigator"

const MainPage = () => {

    const { type, message, reset, show } = useNotificationsStore()
    const isLoading = useLoadingStore(s => s.isLoading)
    const access = useAuthStore(s => s.access)
    const profile = useGetProfileStore(s => s.profile)

    useEffect(() => {
      document.querySelector('html')?.classList.remove('dark')
    }, [])

  return (
    <div className="min-h-screen bg-gray-950 text-slate-50 mx-auto relative">
        {profile && access ? <SideBar profile={profile}/> : 
        // w-full flex justify-center z-50 lg:pb-[100px]
        <WebNavigator />
       }
        <div className="flex-1 ml-0 lg:ml-64">
          {show && 
          <NotificationCard 
              type={type}
              message={message}
              reset={reset}
          />}
          {isLoading && 
            <div className="w-full relative"><Loader /></div>
          }
          <Outlet />
        </div>
        
        {profile && access && <Navigator />}
    </div>
  )
}

export default MainPage