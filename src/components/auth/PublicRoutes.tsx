import { Outlet } from "react-router-dom";
import WebNavigator from "../../router/WebNavigator";
import { useEffect } from "react";
import Footer from "../../router/Footer";
import useNotificationsStore from "../../hooks/store/useNotificationsStore";
import NotificationCard from "../ui/NotificationCard";
import { useNavigate } from "react-router-dom";

const PublicRoutes = () => {

    const { type, message, reset, show } = useNotificationsStore()
    const navigate = useNavigate()

    const isPWA = () => {
        return window.matchMedia('(display-mode: standalone)').matches
    }



    useEffect(() => {
        document.querySelector('html')?.classList.add('dark')

        if (window.location.pathname === '/' && !isPWA()) {
            navigate('/home')
        }
        const accessToken = localStorage.getItem("access");
        
        if (accessToken) {
            navigate("/app/students-main", { replace: true }) 
        } else if (isPWA()) {
            navigate("/", { replace: true });
        }

    }, [])

    return (
        <div className="min-h-screen bg-gray-950 text-slate-50 mx-auto relative">
            <WebNavigator />
            {show && 
            <NotificationCard 
                type={type}
                message={message}
                reset={reset}
            />}
            <Outlet />
            <Footer />
        </div>
    )
}

export default PublicRoutes