import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import useGetAttendance from "../../../../../hooks/api/attendance/useGetAttendance";
import useAuthStore from "../../../../../hooks/store/useAuthStore";
import AttendanceCalendarCard from "./AttendanceCalendarCard";

export type AttendanceStatus =
  | "onTime"
  | "late"
  | "noShow"
  | "absent"
  | "excused";

export interface DailyAttendance {
  date: string; // "2025-04-01"
  entry: AttendanceStatus;
  exit: AttendanceStatus;
}

const months = [
    {id: '1', name: 'Enero'},
    {id: '2', name: 'Febrero'},
    {id: '3', name: 'Marzo'},
    {id: '4', name: 'Abril'},
    {id: '5', name: 'Mayo'},
    {id: '6', name: 'Junio'},
    {id: '7', name: 'Julio'},
    {id: '8', name: 'Agosto'},
    {id: '9', name: 'Septiembre'},
    {id: '10', name: 'Octubre'},
    {id: '11', name: 'Noviembre'},
    {id: '12', name: 'Diciembre'}
]



interface AttendanceCalendarProps {
  studentId: string
}

const weekdays = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];

const AttendanceCalendar: React.FC<AttendanceCalendarProps> = ({
    studentId
}) => {

    const access = useAuthStore((s) => s.access) || "";
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());


    const handlePrevMonth = () => {
        setCurrentMonth((prev) => {
          if (prev === 0) {
            setCurrentYear((y) => y - 1);
            return 11;
          }
          return prev - 1;
        });
      };
    
    const handleNextMonth = () => {
    setCurrentMonth((prev) => {
        if (prev === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
        }
        return prev + 1;
    });
    };

    const monthLabel = months.find((m) => m.id === (currentMonth + 1).toString())?.name || '';

    const {data: attendances, isLoading, isError, error, isSuccess} = useGetAttendance({ access, studentId, month: (currentMonth + 1).toString() })
        
    if (isLoading) return <h2 className="text-2xl animate-pulse text-center my-10">{'Cargando ...'}</h2>

    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess) 





  return (
    <motion.div
            className="w-full dark:bg-gray-900 dark:text-white py-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
        {/* Header */}
        <div className="flex justify-between items-center mb-4 px-2">

            <button
            onClick={handlePrevMonth}
            className="p-1 hover:bg-gray-700 rounded-full"
            >
            <ChevronLeft />
            </button>
            <h2 className="text-lg font-semibold">{monthLabel}</h2>
            <button
            onClick={handleNextMonth}
            className="p-1 hover:bg-gray-700 rounded-full"
            >
            <ChevronRight />
            </button>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 text-center text-sm text-gray-300 mb-2">
            {weekdays.map((day) => (
            <div key={day}>{day}</div>
            ))}
        </div>

        {/* Calendar */}
        <AttendanceCalendarCard 
            currentMonth={currentMonth}
            currentYear={currentYear}
            attendances={attendances}
        />
        </motion.div>

  );
};

export default AttendanceCalendar;
