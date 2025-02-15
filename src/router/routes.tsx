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
import AboutPage from "../pages/AboutPage";
import CareersPage from "../pages/CareersPage";
import ContactPage from "../pages/ContactPage";
import LocateStudentPage from "../pages/LocateStudentPage";
import AssignaturesPage from "../pages/AssignaturesPage";
import AssignaturePage from "../pages/AssignaturePage";
import GradesPage from "../pages/GradesPage";
import GradesSummaryPage from "../pages/GradesSummaryPage";
import CategoriesPage from "../pages/CategoriesPage";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <PublicRoutes />,
        children: [
            {
                path: 'home',
                element: <LandingPage />
            },
            {
                path: "/",
                element: <LoginPage />
            },
            {
                path: "downloadapp",
                element: <DownloadappPage />
            },
            {
                path: "about",
                element: <AboutPage />
            },
            {
                path: "careers",
                element: <CareersPage />
            },
            {
                path: "contact",
                element: <ContactPage />
            }
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
            // {
            //     path: 'student-admin',
            //     element:
            //     <PrivateRoutes>
            //         <StudenAdminPage />
            //     </PrivateRoutes>
            // },
            {
                path: 'user-search',
                element: 
                <PrivateRoutes>
                    <LocateStudentPage />
                </PrivateRoutes>
            },
            {
                path: 'assignatures',
                element:
                <PrivateRoutes>
                    <AssignaturesPage />
                </PrivateRoutes>
            },
            {
                path: 'assignature/:assignatureId',
                element: 
                <PrivateRoutes>
                    <AssignaturePage />
                </PrivateRoutes>
            },
            {
                path: 'grades/:assignmentId',
                element:
                <PrivateRoutes>
                    <GradesPage />
                </PrivateRoutes>
            },
            {
                path: 'grades-summary',
                element:
                <PrivateRoutes>
                    <GradesSummaryPage />
                </PrivateRoutes>
            },
            {
                path: 'categories',
                element:
                <PrivateRoutes>
                    <CategoriesPage />
                </PrivateRoutes>
            },
            {
                path: 'student-admin',
                element:
                <PrivateRoutes>
                    <StudenAdminPage />
                </PrivateRoutes>
            }
        ]
    }
])

export default routes