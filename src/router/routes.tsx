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
import NewPasswordPage from "../pages/NewPasswordPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import PasswordResetConfirmation from "../pages/PasswordResetConfirmation";
import PasswordResetSuccess from "../pages/PasswordResetSuccess";
import GradesSummaryTutorPage from "../pages/GradesSummaryTutorPage";
import StudentsAdminByClassroom from "../pages/StudentsAdminByClassroom";
import GradesForTutorPage from "../pages/GradesForTutorPage";
import DownloadPage from "../pages/DownloadPage";
import AdminPage from "../pages/AdminPage";
import AnnouncementsAdminPage from "../pages/AnnouncementsAdminPage";
import WhatsappDashboard from "../pages/WhatsappPage";
import GradesReportPage from "../pages/GradesReportPage";
import LessonPage from "../pages/LessonPage";
import PricesPage from "../pages/PricesPage";
import SchoolPage from "../pages/SchoolPage";


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
                path: 'download',
                element: <DownloadPage />
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
            },
            {
                path: 'new-password/:uid/:token',
                element: <NewPasswordPage />
            },
            {
                path: 'forgot-password',
                element: <ForgotPasswordPage />
            },
            {
                path: 'reset-confirmation',
                element: <PasswordResetConfirmation />
            },
            {
                path: 'reset-success',
                element: <PasswordResetSuccess />
            },
            {
                path: 'prices',
                element: <PricesPage />
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
                path: "announcements-admin",
                element:
                <PrivateRoutes>
                    <AnnouncementsAdminPage />
                </PrivateRoutes>
            },
            {
                path: "profile",
                element:
                <PrivateRoutes>
                    <ProfilePage />
                </PrivateRoutes>

            },
            // {
            //     path: 'students',
            //     element:
            //     <PrivateRoutes>
            //         <StudentsByClassroom />
            //     </PrivateRoutes>
            // },
            {
                path: 'students-main/:classroom',
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
                path: 'assignatures/:assignatureId',
                element: 
                <PrivateRoutes>
                    <AssignaturePage />
                </PrivateRoutes>
            },
            {
                path: 'assignatures/:assignatureId/lesson/:lessonId',
                element: 
                <PrivateRoutes>
                    <LessonPage />
                </PrivateRoutes>
            },
            {
                path: 'assignatures/:assignatureId/activity/:activityId',
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
            },
            {
                path:'tutor-grades',
                element:
                <PrivateRoutes>
                    <GradesSummaryTutorPage />
                </PrivateRoutes>
            },
            {
                path: 'student-admin/subscribed/:classroomId',
                element:
                <PrivateRoutes>
                    <StudentsAdminByClassroom />
                </PrivateRoutes>
            },
            {
                path: "students-main/gradesForTutor",
                element:
                <PrivateRoutes>
                    <GradesForTutorPage />
                </PrivateRoutes>
            },
            {
                path: 'admin',
                element:
                <PrivateRoutes>
                    <AdminPage />
                </PrivateRoutes>
            },
            {
                path: 'whatsapp',
                element:
                <PrivateRoutes>
                    <WhatsappDashboard />
                </PrivateRoutes>
            },
            {
                path: 'grades-report',
                element:
                <PrivateRoutes>
                    <GradesReportPage />
                </PrivateRoutes>
            },
            {
                path: 'school',
                element: 
                    <PrivateRoutes>
                        <SchoolPage />
                    </PrivateRoutes>
            }
        ]
    }
])

export default routes