import { Outlet } from "react-router-dom";
import WebNavigator from "../../router/WebNavigator";
import { useEffect } from "react";

const PublicRoutes = () => {

    useEffect(() => {
        document.querySelector('html')?.classList.remove('dark')
    }, [])

    return (
        <div className="min-h-screen dark:bg-neutral-950 dark:text-slate-50 bg-white text-black mx-auto relative ">
            <WebNavigator />
            <Outlet />
        </div>
    )
}

export default PublicRoutes