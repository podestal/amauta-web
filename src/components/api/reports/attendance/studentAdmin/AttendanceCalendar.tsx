import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import moment from "moment";

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

interface AttendanceCalendarProps {
  allAttendanceData: DailyAttendance[];
}

const statusInfo: Record<
  AttendanceStatus,
  { label: string; color: string; icon: JSX.Element }
> = {
  onTime: {
    label: "Temprano",
    color: "text-green-400",
    icon: <CheckCircle className="w-4 h-4 text-green-400" />,
  },
  late: {
    label: "Tarde",
    color: "text-yellow-400",
    icon: <Clock className="w-4 h-4 text-yellow-400" />,
  },
  noShow: {
    label: "Falta",
    color: "text-red-500",
    icon: <XCircle className="w-4 h-4 text-red-500" />,
  },
  absent: {
    label: "Salió temprano ",
    color: "text-gray-400",
    icon: <AlertTriangle className="w-4 h-4 text-gray-400" />,
  },
  excused: {
    label: "Excusado",
    color: "text-blue-400",
    icon: <CalendarDays className="w-4 h-4 text-blue-400" />,
  },
};

const weekdays = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];

const AttendanceCalendar: React.FC<AttendanceCalendarProps> = ({
    allAttendanceData,
    
}) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

//   const filteredData = useMemo(() => {
//     return allAttendanceData.filter((d) => {
//       const date = new Date(d.date);
//       return (
//         date.getFullYear() === currentYear && date.getMonth() === currentMonth
//       );
//     });
//   }, [allAttendanceData, currentMonth, currentYear]);

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const blanks = Array.from({ length: firstDay });
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => {
    const dateStr = moment({ year: currentYear, month: currentMonth, day: i + 1 }).format("YYYY-MM-DD");
    const match = allAttendanceData.find((d) => d.date === dateStr);
    return { date: dateStr, ...match };
  });
    // const calendarDays = Array.from({ length: daysInMonth }, (_, i) => {
    //     const day = i + 1;
    //     const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    //     const match = filteredData.find((d) => d.date === dateStr);
    //     return { date: dateStr, ...match };
    // });

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

  const monthLabel = new Date(currentYear, currentMonth).toLocaleString(
    "default",
    { month: "long", year: "numeric" }
  );

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
        <div className="grid grid-cols-7 gap-2 bg-gray-800 p-4 rounded-2xl shadow">
            {blanks.map((_, i) => (
            <div key={`blank-${i}`} />
            ))}
            {calendarDays.map((day, i) => (
            <div
                key={day.date}
                className="border border-gray-700 rounded-xl p-2 flex flex-col items-center bg-gray-900 hover:bg-gray-700 transition"
            >
                <>{console.log('calendarDays', calendarDays)}</>
                <>{console.log('calendarDays', moment({ year: currentYear, month: currentMonth, day: i + 1 }).format("DD"))}</>
                <span className="text-xs font-bold text-gray-300">
                {moment({ year: currentYear, month: currentMonth, day: i + 1 }).format("DD")}
                </span>
                {day.entry && day.exit ? (
                <div className="mt-2 space-y-1 text-center">
                    <div className="flex items-center space-x-1">
                    {statusInfo[day.entry].icon}
                        <div className="w-full flex justify-between">
                            <span className="text-[10px] text-gray-400">Entrada</span>
                            <span className="text-[10px] text-gray-400">07:56</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-1">
                    {statusInfo[day.exit].icon}
                    <div className="w-full flex justify-between">
                    <span className="text-[10px] text-gray-400">Salida</span>
                    <span className="text-[10px] text-gray-400">04:12</span>
                    </div>

                    </div>
                </div>
                ) : (
                <span className="text-[10px] text-gray-500 mt-2">No data</span>
                )}
            </div>
            ))}
        </div>

        {/* Legend */}
        <div className="my-6 mx-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-sm text-gray-300">
            {Object.entries(statusInfo).map(([key, { label, icon }]) => (
            <div key={key} className="flex items-center space-x-2">
                {icon}
                <span>{label}</span>
            </div>
            ))}
        </div>
        </motion.div>

  );
};

export default AttendanceCalendar;
