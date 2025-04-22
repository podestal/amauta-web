import { NavLink } from "react-router-dom";
import useGetProfileStore from "../hooks/store/useGetProfileStore";
import { Profile } from "../services/api/profileService";
import Logout from "../components/auth/Logout";
import { BookUser, Boxes, ChartColumnStacked, ChartNoAxesCombined, HomeIcon, IdCard, LibraryBig, MessagesSquare, SquareTerminal, Sunrise } from "lucide-react";

interface Props {
    profile: Profile
}

const groupToSpanish: Record<string, string> = {
    instructor: "Docente",
    assistant: "Auxiliar",
    student: "Estudiante",
    tutor: "Tutor",
    manager: 'Administrativo'
}

const SideBar = ({ profile }: Props) => {

    const group = useGetProfileStore(s => s.user)?.groups[0] || useGetProfileStore(s => s.user)?.profile || ''

    let navItems = [
      { name: "Clases", path: "students-main", icon: <HomeIcon /> },
      // { name: "Anuncios", path: "/announcement" },
      // { name: "Profile", path: "/profile" },
      // { name: "Students", path: "/students" },
      { name: "Asistencias", path: "reports", icon: <Sunrise /> },
      { name: "Cursos", path: "assignatures", icon: <LibraryBig /> },
      { name: 'Servicios', path: 'whatsapp' , icon: <Boxes /> },
      { name: 'Tarjeta de Notas', path: 'grades-report', icon: <IdCard />},
      { name: 'Notas', path: 'grades-summary', icon: <ChartNoAxesCombined /> },
      { name: 'Categorías', path: 'categories', icon: <ChartColumnStacked /> },
      { name: "Alumnos", path: "student-admin", icon: <BookUser /> },
      // { name: "Descargar", path: "/downloadapp" },
    ]

    if (group === 'manager') {
      navItems = [
        // { name: "Clases", path: "students-main" },
        // { name: "Anuncios", path: "/announcement" },
        // { name: "Profile", path: "/profile" },
        // { name: "Students", path: "/students" },
        { name: "Asistencias", path: "reports", icon: <Sunrise /> },
        { name: "Alumnos", path: "student-admin", icon: <BookUser /> },
        { name: 'Administrativo', path: 'admin', icon: <SquareTerminal /> },
        { name: 'Anuncios', path: 'announcements-admin', icon: <MessagesSquare /> },
        // { name: 'Servicios', path: 'whatsapp' },
        // { name: 'Tarjeta de Notas', path: 'grades-report'},
      ]
    } else if (group === 'instructor') {
      navItems = [
        { name: "Clases", path: "students-main", icon: <HomeIcon /> },
        { name: "Asistencias", path: "reports", icon: <Sunrise /> },
        { name: "Cursos", path: "assignatures", icon: <LibraryBig /> },
        { name: 'Notas', path: 'grades-summary', icon: <ChartNoAxesCombined /> },
        { name: 'Categorías', path: 'categories', icon: <ChartColumnStacked /> },
        { name: "Servicios", path: "whatsapp", icon: <Boxes /> },
        { name: 'Tarjeta de Notas', path: 'grades-report', icon: <IdCard />},
        { name: "Alumnos", path: "student-admin", icon: <BookUser /> },
        // { name: 'Anuncios', path: 'announcements-admin' },
      ]
    } else if (group === 'assistant') {
      navItems = [
        { name: "Clases", path: "students-main", icon: <HomeIcon /> },
        { name: "Asistencias", path: "reports", icon: <Sunrise /> },
        { name: "Alumnos", path: "student-admin", icon: <BookUser /> },
        { name: 'Anuncios', path: 'announcements-admin', icon: <MessagesSquare /> },
      ]
    } else if (group === 'tutor') {
      navItems = [
        { name: "Alumnos", path: "students-main", icon: <BookUser /> },
      ]
    }

  return (
    <div className="hidden lg:flex flex-col w-64 h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white shadow-xl p-6 fixed z-50">
    {profile && (
        <div className="flex items-start space-x-4 mb-10">
            <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center text-white text-lg font-bold">
                {profile.first_name?.[0]}{profile.last_name?.[0]}
            </div>
            <div>
                <p className="font-semibold text-md">{profile.first_name}</p>
                <p className="font-semibold text-md">{profile.last_name}</p>
                <p className="text-sm text-gray-400 mt-2">{groupToSpanish[group]}</p>
            </div>
            
        </div>
    )}

    <nav className="flex flex-col space-y-2 mb-auto">
        {navItems.map(item => (
            <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                    `px-4 py-2 rounded-lg transition-colors duration-200 font-medium text-sm flex items-center gap-2 ${
                        isActive
                            ? "bg-blue-600 text-white shadow"
                            : "text-gray-300 hover:bg-slate-700 hover:text-white"
                    }`
                }
            >
                {item.icon && item.icon}
                <span>{item.name}</span>
            </NavLink>
        ))}
    </nav>

    <div className="mt-8 w-full flex justify-center items-center">
        <Logout />
    </div>
</div>
    // <div className="hidden lg:block w-64 h-full bg-slate-950 px-4 py-8 fixed mr-64 z-50">
    //   <nav className="space-y-4 mb-10">
    //     {profile &&
    //         <div className="flex items-center space-x-4 mb-8">
    //             <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-blue-800 to-slate-900 rounded-full dark:text-slate-50 font-bold text-md overflow-hidden">
    //                 <span>
    //                     {profile.first_name ? profile?.first_name[0] : ''}{profile?.last_name ? profile?.last_name[0] : ''}
    //                 </span>
    //             </div>
    //             <div className="flex flex-col gap-2">
    //                 <p className="text-sm font-bold">{profile.first_name} {profile.last_name}</p>
    //                 <p className="text-xs">{groupToSpanish[group]}</p>
    //             </div>
    //         </div>
    //     }
    //     {navItems.map((item) => (
    //       <NavLink
    //         key={item.path}
    //         to={item.path}
    //         className={({ isActive }) =>
    //           `block px-4 py-2 rounded-2xl text-sm ${
    //             isActive
    //               ? "bg-blue-600 text-white"
    //               : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
    //           }`
    //         }
    //       >
    //         {item.name}
    //       </NavLink>
    //     ))}
        
    //   </nav>
    //   <div className="flex justify-start items-center px-4">
    //       <Logout />
    //   </div>
      
    // </div>
  );
};

export default SideBar;
