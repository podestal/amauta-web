import { NavLink } from "react-router-dom";
import useGetProfileStore from "../hooks/store/useGetProfileStore";
import { Profile } from "../services/api/profileService";
import Logout from "../components/auth/Logout";
import { BookUser, Boxes, ChartColumnStacked, ChartNoAxesCombined, HomeIcon, IdCard, LibraryBig, MessagesSquare, PanelRightClose, PanelRightOpen, SquareTerminal, Sunrise } from "lucide-react";
import logo from '../assets/icons/amautapp.png'
import { motion } from "framer-motion";
import getTitleCase from "../utils/getTitleCase";
import ThemeSelector from "../components/ui/ThemeSelector";

interface Props {
    profile: Profile
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

const groupToSpanish: Record<string, string> = {
    instructor: "Docente",
    assistant: "Auxiliar",
    student: "Estudiante",
    tutor: "Tutor",
    manager: 'Administrativo'
}

const SideBar = ({ profile, isOpen, setIsOpen }: Props) => {

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
        // { name: "Servicios", path: "whatsapp", icon: <Boxes /> },
        // { name: 'Tarjeta de Notas', path: 'grades-report', icon: <IdCard />},
        // { name: "Alumnos", path: "student-admin", icon: <BookUser /> },
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
    <motion.div 
      animate={{ width: isOpen ? 256 : 112 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`hidden lg:flex flex-col h-screen bg-gradient-to-b from-slate-50 via-slate-200 to-slate-300 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 dark:text-white shadow-xl p-6 fixed z-50`}>
      <div className="flex items-center gap-2 mb-6">
        <img className="mx-1" src={logo} width={50} alt="Amautapp" />
        {isOpen && <p className="text-lg font-bold font-poppins">Amautapp</p>}
      </div>
      <nav className="flex flex-col space-y-2 mb-auto">
          {navItems.map(item => (
              <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                      `px-4 py-2 rounded-lg transition-colors duration-200 font-medium text-sm flex items-center gap-2 ${
                          isActive
                              ? "bg-blue-600 text-white shadow"
                              : "dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-slate-700 dark:hover:text-white"
                      }`
                  }
              >
                  {item.icon && item.icon}
                  {isOpen && <span>{item.name}</span>}
              </NavLink>
          ))}

      </nav>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="dark:text-gray-300 hover:text-slate-500 dark:hover:text-white transition px-4 py-2 mb-4 flex gap-2 items-center"
      >
        {isOpen ? <PanelRightOpen /> : <PanelRightClose />}
        {isOpen && <span>Colapsar Menu</span>}
      </button>
      <ThemeSelector 
        sidebar
        isOpen={isOpen}
      />

      {profile && (
        <div className={`flex items-start space-x-4 my-10 ${isOpen && 'px-4 py-2'}`}>
          {isOpen ? 
          <div>
            <p className="font-semibold text-md">{profile.first_name && getTitleCase(profile.first_name.toLocaleLowerCase())}</p>
            <p className="font-semibold text-md">{profile.last_name && getTitleCase(profile.last_name.toLocaleLowerCase())}</p>
            <p className="text-sm dark:text-gray-400 text-gray-800 mt-2">{groupToSpanish[group]}</p>
          </div> 
           : 
           
          <div className="mx-1 w-12 h-12 bg-gradient-to-r from-blue-900 via-blue-950  to-slate-950  rounded-full flex items-center justify-center text-white text-lg font-bold">
              {profile.first_name?.[0]}{profile.last_name?.[0]}
          </div>
            }
        </div>
        
    )}
      <Logout 
        icon
        isOpen={isOpen}
      />
    </motion.div>
  );
};

export default SideBar;
