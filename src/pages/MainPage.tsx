import { Outlet } from "react-router-dom"
import NotificationCard from "../components/ui/NotificationCard"
import useNotificationsStore from "../hooks/store/useNotificationsStore"
import Navigator from "../router/Navigator"
import useAuthStore from "../hooks/store/useAuthStore"
import useLoadingStore from "../hooks/store/useLoadingStore"
import Loader from "../components/ui/Loader"
import { useEffect, useState } from "react"
import useGetProfileStore from "../hooks/store/useGetProfileStore"
import SideBar from "../router/SideBar"
import WebNavigator from "../router/WebNavigator"
import useSchoolStore from "../hooks/store/useSchoolStore"
import getUnpaidInfo from "../utils/getUnpaidInfo"

const MainPage = () => {

    const { type, message, reset, show } = useNotificationsStore()
    const isLoading = useLoadingStore(s => s.isLoading)
    const access = useAuthStore(s => s.access)
    const profile = useGetProfileStore(s => s.profile)
    const [isOpen, setIsOpen] = useState(true)
    const school = useSchoolStore(s => s.school)
    getUnpaidInfo()

    useEffect(() => {
      document.querySelector('html')?.classList.add('dark')
    }, [])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-gray-950 dark:text-slate-50 mx-auto relative">
      <>{console.log('school', school)}</>
      {school.payment_status === 'N' && 
      <>
      <div className="w-full bg-red-600 text-white px-4 h-8 text-sm flex items-center justify-center z-50 fixed top-0">
        <span className="font-semibold text-center">
          ⚠️ Tu suscripción ha expirado. Por favor, realiza el pago para continuar usando la plataforma.
        </span>
      </div>
      <div className="pt-8"></div>
      </>}
        {profile && access ? 
          <SideBar 
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            profile={profile}/> : 
        // w-full flex justify-center z-50 lg:pb-[100px]
        <WebNavigator />
       }
        <div className={`flex-1 ml-0 ${isOpen ? 'lg:ml-64' : 'lg:ml-28'}`}>
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