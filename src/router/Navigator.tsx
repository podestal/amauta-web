import { RiBookletFill, RiCalendarScheduleFill, RiFileUserFill, RiGraduationCapFill } from '@remixicon/react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import useGetProfileStore from '../hooks/store/useGetProfileStore';
import useLanguageStore from '../hooks/store/useLanguageStore';
import { Instructor } from '../services/api/instructorService';
import { canCreateUpdateAttendance } from '../utils/canUpdateCreateAttendance';

const Navigator: React.FC = () => {

  const group = useGetProfileStore(s=>s.user?.groups[0])
  const profile = useGetProfileStore(s=>s.profile)
  const instructor = group === 'instructor' && profile as Instructor

  const createUpdateAttendance = instructor && canCreateUpdateAttendance(instructor.clases_details)
  
  const lan = useLanguageStore(s=>s.lan)

  return (
    <nav className="bg-slate-200 dark:bg-slate-800 fixed bottom-0 w-full flex justify-around py-2 shadow-md z-50 md:hidden">
      {group === 'assistant' &&
      <>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center text-sm ${
              isActive ? 'text-blue-500' : 'text-gray-500'
            }`
          }
        >
          <RiGraduationCapFill />
          <span>{lan === 'EN' ? 'Students' : 'Alumnos'}</span>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center text-sm ${
              isActive ? 'text-blue-500' : 'text-gray-500'
            }`
          }
        >
          <RiFileUserFill />
          <span>{lan === 'EN' ? 'Profile' : 'Perfil' }</span>
        </NavLink>
      </>}
      {instructor &&
      <>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center text-sm ${
              isActive ? 'text-blue-500' : 'text-gray-500'
            }`
          }
        >
          <RiGraduationCapFill />
          <span>{lan === 'EN' ? 'Students' : 'Alumnos'}</span>
        </NavLink>
        {createUpdateAttendance && <NavLink
          to="/attendance"
          className={({ isActive }) =>
            `flex flex-col items-center text-sm ${
              isActive ? 'text-blue-500' : 'text-gray-500'
            }`
          }
        >
          <RiCalendarScheduleFill />
          <span>{lan === 'EN' ? 'Attendance' : 'Asistencia' }</span>
        </NavLink>}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center text-sm ${
              isActive ? 'text-blue-500' : 'text-gray-500'
            }`
          }
        >
          <RiFileUserFill />
          <span>{lan === 'EN' ? 'Profile' : 'Perfil' }</span>
        </NavLink>
      </>}
      {group === 'tutor' &&
      <>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center text-sm ${
                isActive ? 'text-blue-500' : 'text-gray-500'
              }`
            }
          >
            <RiGraduationCapFill />
            <span>{lan === 'EN' ? 'Progress' : 'Progreso' }</span>
          </NavLink>
          <NavLink
            to="/announcement"
            className={({ isActive }) =>
              `flex flex-col items-center text-sm ${
                isActive ? 'text-blue-500' : 'text-gray-500'
              }`
            }
          >
            <RiBookletFill />
            <span>{lan === 'EN' ? 'Announcements' : 'Mensajes' }</span>
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex flex-col items-center text-sm ${
                isActive ? 'text-blue-500' : 'text-gray-500'
              }`
            }
          >
            <RiFileUserFill />
            <span>{lan === 'EN' ? 'Profile' : 'Perfil' }</span>
          </NavLink>
      </>}
    </nav>
  );
};

export default Navigator;
