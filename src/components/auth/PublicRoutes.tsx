import { Outlet } from "react-router-dom";
import WebNavigator from "../../router/WebNavigator";
import { useEffect } from "react";
import Footer from "../../router/Footer";

const PublicRoutes = () => {

    useEffect(() => {
        document.querySelector('html')?.classList.add('dark')
    }, [])

    return (
        <div className="min-h-screen bg-gray-950 text-slate-50 mx-auto relative ">
            <WebNavigator />
            <Outlet />
            <Footer />
        </div>
    )
}

export default PublicRoutes