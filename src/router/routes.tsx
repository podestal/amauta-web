import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
import StudentsPage from "../pages/StudentsPage";
import AttendancePage from "../pages/AttendancePage";
import ProfilePage from "../pages/ProfilePage";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
        errorElement: <div>404</div>,
        children: [
            {
                path: "/",
                element: <LoginPage />
            },
            {
                path: "/students",
                element: <StudentsPage />
            },
            {
                path: "/attendance",
                element: <AttendancePage />
            },
            {
                path: "/profile",
                element: <ProfilePage />
            },
        ]
    }
])

export default routes