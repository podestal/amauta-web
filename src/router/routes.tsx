import { createBrowserRouter } from "react-router-dom";
import PrivateRoutes from "../components/auth/PrivateRoutes";
import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
import StudentsPage from "../pages/StudentsPage";
import AttendancePage from "../pages/AttendancePage";
import ProfilePage from "../pages/ProfilePage";
import StudentsByClassroom from "../pages/StudentsByClassroom";
import DownloadappPage from "../pages/DownloadappPage";
import AnnouncementsPage from "../pages/AnnouncementsPage";
import DetailedAttendancePage from "../pages/DetailedAttendancePage";
import ReportsPage from "../pages/ReportsPage";
import StudenAdminPage from "../pages/StudenAdminPage";
import LandingPage from "../pages/LandingPage";
import PublicRoutes from "../components/auth/PublicRoutes";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <PublicRoutes />,
        children: [
            {
                path: '/',
                element: <LandingPage />
            },
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "downloadapp",
                element: <DownloadappPage />
            },
            {
                path: "tesitng",
                element: <div>Testing</div>
            },
        ]
    },
    {
        path: "/app",
        element: <MainPage />,
        errorElement: <div>404</div>,
        children: [
            {
                path: "students-main",
                element: 
                <PrivateRoutes>
                    <StudentsPage />
                </PrivateRoutes>
            },
            {
                path: "attendance",
                element: 
                <PrivateRoutes>
                    <AttendancePage />
                </PrivateRoutes>
            },
            {
                path: "announcement",
                element: 
                <PrivateRoutes>
                    <AnnouncementsPage />
                </PrivateRoutes>
            },
            {
                path: "profile",
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
                path: 'attendance/:studentId',
                element: 
                <PrivateRoutes>
                    <DetailedAttendancePage />
                </PrivateRoutes>
            },
            {
                path: 'reports',
                element:
                <PrivateRoutes>
                    <ReportsPage />
                </PrivateRoutes>
            },
            {
                path: 'student-admin',
                element:
                <PrivateRoutes>
                    <StudenAdminPage />
                </PrivateRoutes>
            },
        ]
    }
])

export default routes