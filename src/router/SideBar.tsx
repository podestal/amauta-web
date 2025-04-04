import { NavLink } from "react-router-dom";
import useGetProfileStore from "../hooks/store/useGetProfileStore";
import { Profile } from "../services/api/profileService";
import Logout from "../components/auth/Logout";

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

    // let navItems

    // if (group === 'instructor') {
    //   navItems = [
    //       { name: "Clases", path: "students-main" },
    //       { name: "Asistencias", path: "reports" },
    //       { name: "Cursos", path: "assignatures" },
    //       { name: 'Notas', path: 'grades-summary' },
    //       { name: 'Categorías', path: 'categories' },
    //   ]
    // } else if (group === 'assistant') {
    //   navItems = [
    //       { name: "Clases", path: "students-main" },
    //       { name: "Asistencias", path: "reports" },
    //   ]
    // }

    let navItems = [
      { name: "Clases", path: "students-main" },
      // { name: "Anuncios", path: "/announcement" },
      // { name: "Profile", path: "/profile" },
      // { name: "Students", path: "/students" },
      { name: "Asistencias", path: "reports" },
      { name: "Cursos", path: "assignatures" },
      { name: 'Notas', path: 'grades-summary' },
      { name: 'Categorías', path: 'categories' },
      { name: "Alumnos", path: "student-admin" },
      // { name: "Descargar", path: "/downloadapp" },
    ]

    if (group === 'manager') {
      navItems = [
        // { name: "Clases", path: "students-main" },
        // { name: "Anuncios", path: "/announcement" },
        // { name: "Profile", path: "/profile" },
        // { name: "Students", path: "/students" },
        { name: "Asistencias", path: "reports" },
        { name: "Alumnos", path: "student-admin" },
        { name: 'Administrativo', path: 'admin' },
        { name: 'Anuncios', path: 'announcements-admin' },
        { name: 'Servicios', path: 'whatsapp' },
      ]
    } else if (group === 'instructor') {
      navItems = [
        { name: "Clases", path: "students-main" },
        { name: "Asistencias", path: "reports" },
        { name: "Cursos", path: "assignatures" },
        { name: 'Notas', path: 'grades-summary' },
        { name: 'Categorías', path: 'categories' },
        { name: "Alumnos", path: "student-admin" },
        // { name: 'Anuncios', path: 'announcements-admin' },
      ]
    } else if (group === 'assistant') {
      navItems = [
        { name: "Clases", path: "students-main" },
        { name: "Asistencias", path: "reports" },
        { name: "Alumnos", path: "student-admin" },
        { name: 'Anuncios', path: 'announcements-admin' },
      ]
    } else if (group === 'tutor') {
      navItems = [
        { name: "Alumnos", path: "students-main" },
      ]
    }

  return (
    <div className="hidden lg:block w-64 h-full bg-slate-950 px-4 py-8 fixed mr-64 z-50">
      <nav className="space-y-4 mb-10">
        {profile &&
            <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-blue-800 to-slate-900 rounded-full dark:text-slate-50 font-bold text-md overflow-hidden">
                    <span>
                        {profile.first_name[0]}{profile.last_name[0]}
                    </span>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-sm font-bold">{profile.first_name} {profile.last_name}</p>
                    <p className="text-xs">{groupToSpanish[group]}</p>
                </div>
            </div>
        }
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-2xl text-sm ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
        
      </nav>
      <div className="flex justify-start items-center px-4">
          <Logout />
      </div>
      
    </div>
  );
};

export default SideBar;
