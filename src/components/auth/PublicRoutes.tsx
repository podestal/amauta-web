import { Outlet } from "react-router-dom";
import WebNavigator from "../../router/WebNavigator";
import { useEffect } from "react";
import Footer from "../../router/Footer";
import useNotificationsStore from "../../hooks/store/useNotificationsStore";
import NotificationCard from "../ui/NotificationCard";

const PublicRoutes = () => {

    const { type, message, reset, show } = useNotificationsStore()

    useEffect(() => {
        document.querySelector('html')?.classList.add('dark')
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