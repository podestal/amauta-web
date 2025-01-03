import { RiCalendarScheduleFill, RiFileUserFill, RiGraduationCapFill } from '@remixicon/react';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigator: React.FC = () => {
  return (
    <nav className="bg-slate-200 dark:bg-slate-800 fixed bottom-0 w-full flex justify-around py-2 shadow-md">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex flex-col items-center text-sm ${
            isActive ? 'text-blue-500' : 'text-gray-500'
          }`
        }
      >
        <RiGraduationCapFill />
        <span>Students</span>
      </NavLink>
      <NavLink
        to="/attendance"
        className={({ isActive }) =>
          `flex flex-col items-center text-sm ${
            isActive ? 'text-blue-500' : 'text-gray-500'
          }`
        }
      >
        <RiCalendarScheduleFill />
        <span>Attendance</span>
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
        <span>Profile</span>
      </NavLink>
    </nav>
  );
};

export default Navigator;
