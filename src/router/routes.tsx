import { createBrowserRouter } from "react-router-dom";
import PrivateRoutes from "../components/auth/PrivateRoutes";
import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
import StudentsPage from "../pages/StudentsPage";
import AttendancePage from "../pages/AttendancePage";
import ProfilePage from "../pages/ProfilePage";
import StudentsByClassroom from "../pages/StudentsByClassroom";
import DownloadappPage from "../pages/DownloadappPage";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
        errorElement: <div>404</div>,
        children: [
            {
                path: "/",
                element: 
                <PrivateRoutes>
                    <StudentsPage />
                </PrivateRoutes>
            },
            {
                path: "/attendance",
                element: 
                <PrivateRoutes>
                    <AttendancePage />
                </PrivateRoutes>
            },
            {
                path: "/profile",
                element:
                <PrivateRoutes>
                    <ProfilePage />
                </PrivateRoutes>

            },
            {
                path: 'students',
                element:
                <PrivateRoutes>
                    <StudentsByClassroom />
                </PrivateRoutes>
            },
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/downloadapp",
                element: <DownloadappPage />
            },
            {
                path: "/tesitng",
                element: <div>Testing</div>
            }
        ]
    }
])

export default routes