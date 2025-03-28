import { RiBookShelfFill, RiCalendarScheduleFill, RiEqualizerFill, RiFileUserFill, RiGraduationCapFill, RiUserSearchFill } from '@remixicon/react';
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
    <nav className="bg-slate-200 dark:bg-slate-900 fixed bottom-0 w-full flex justify-around py-2 shadow-md z-50 md:hidden">
      {group === 'assistant' &&
      <>
        <NavLink
          to="students-main"
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
          to="attendance"
          className={({ isActive }) =>
            `flex flex-col items-center text-sm ${
              isActive ? 'text-blue-500' : 'text-gray-500'
            }`
          }
        >
          <RiCalendarScheduleFill />
          <span>{lan === 'EN' ? 'Attendance' : 'Asistencia' }</span>
        </NavLink>
        <NavLink
          to="user-search"
          className={({ isActive }) =>
            `flex flex-col items-center text-sm ${
              isActive ? 'text-blue-500' : 'text-gray-500'
            }`
          }
        >
          <RiUserSearchFill />
          <span>{lan === 'EN' ? 'Student' : 'Alumno' }</span>
        </NavLink>
        {/* <NavLink
          to="assignatures"
          className={({ isActive }) =>
            `flex flex-col items-center text-sm ${
              isActive ? 'text-blue-500' : 'text-gray-500'
            }`
          }
        >
          <RiBookShelfFill />
          <span>{lan === 'EN' ? 'Assignatures' : 'Cursos' }</span>
        </NavLink> */}
        <NavLink
          to="profile"
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
          to="students-main"
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
          to="attendance"
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
          to="user-search"
          className={({ isActive }) =>
            `flex flex-col items-center text-sm ${
              isActive ? 'text-blue-500' : 'text-gray-500'
            }`
          }
        >
          <RiUserSearchFill />
          <span>{lan === 'EN' ? 'Student' : 'Alumno' }</span>
        </NavLink>
        <NavLink
          to="assignatures"
          className={({ isActive }) =>
            `flex flex-col items-center text-sm ${
              isActive ? 'text-blue-500' : 'text-gray-500'
            }`
          }
        >
          <RiBookShelfFill />
          <span>{lan === 'EN' ? 'Assignatures' : 'Cursos' }</span>
        </NavLink>
        <NavLink
          to="categories"
          className={({ isActive }) =>
            `flex flex-col items-center text-sm ${
              isActive ? 'text-blue-500' : 'text-gray-500'
            }`
          }
        >
          <RiEqualizerFill />
          <span>{lan === 'EN' ? 'Categories' : 'Categorías' }</span>
        </NavLink>
        <NavLink
          to="profile"
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
            to="students-main"
            className={({ isActive }) =>
              `flex flex-col items-center text-sm ${
                isActive ? 'text-blue-500' : 'text-gray-500'
              }`
            }
          >
            <RiGraduationCapFill />
            <span>{lan === 'EN' ? 'Progress' : 'Progreso' }</span>
          </NavLink>
          {/* <NavLink
            to="tutor-grades"
            className={({ isActive }) =>
              `flex flex-col items-center text-sm ${
                isActive ? 'text-blue-500' : 'text-gray-500'
              }`
            }
          >
            <RiGraduationCapFill />
            <span>{lan === 'EN' ? 'Grades' : 'Notas' }</span>
          </NavLink> */}
          {/* <NavLink
            to="announcement"
            className={({ isActive }) =>
              `flex flex-col items-center text-sm ${
                isActive ? 'text-blue-500' : 'text-gray-500'
              }`
            }
          >
            <RiBookletFill />
            <span>{lan === 'EN' ? 'Announcements' : 'Agenda' }</span>
          </NavLink> */}
          <NavLink
            to="profile"
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
