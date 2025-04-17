import moment from "moment";
import { AttendanceStatus } from "./AttendanceCalendar";
import { AlertTriangle, CalendarDays, CheckCircle, Clock, XCircle } from "lucide-react";
import { Attendance } from "../../../../../services/api/attendanceService";

// status mapping (adjust as needed)
const mapStatus: Record<string, string> = {
    'O': "onTime",   // example: O → onTime
    'L': "late",
    'N': "noShow",
    'E': "excused",
    'T': "absent",
  };

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

interface Props {
    currentYear: number
    currentMonth: number
    attendances:Attendance[]

}

const AttendanceCalendarCard = ({ currentYear, currentMonth, attendances }: Props) => {

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const blanks = Array.from({ length: firstDay });

    const transformAttendance = (attendances: Attendance[]) => {
        const grouped: Record<
          string,
          {
            entry?: { status: string; time: string };
            exit?: { status: string; time: string };
          }
        > = {};
      
        attendances.forEach((item) => {
          const dateKey = moment(item.created_at).format("YYYY-MM-DD");
          const timeStr = moment(item.created_at).format("HH:mm");
          const statusLabel = mapStatus[item.status] || "unknown";
      
          if (!grouped[dateKey]) {
            grouped[dateKey] = {};
          }
      
          const record = { status: statusLabel, time: timeStr };
      
          if (item.kind === "I") {
            grouped[dateKey].entry = record;
          } else if (item.kind === "O") {
            grouped[dateKey].exit = record;
          }
        });
      
        return Object.entries(grouped).map(([date, value]) => ({
          date,
          ...value,
        }));
      };

      const calendarDays = Array.from({ length: daysInMonth }, (_, i) => {
        const dateStr = moment({ year: currentYear, month: currentMonth, day: i + 1 }).format("YYYY-MM-DD");
        const match = transformAttendance(attendances).find((d) => d.date === dateStr);
        return { date: dateStr, ...match };
    });




  return (
<>
    <div className="grid grid-cols-7 gap-2 bg-gray-800 print:bg-white print:text-slate-950 p-4 rounded-2xl shadow">
        {/* <>{console.log('transformAttendance', transformAttendance(attendances))}</> */}
        {blanks.map((_, i) => (
        <div key={`blank-${i}`} />
        ))}
        {calendarDays.map((day, i) => (
        <div
            key={day.date}
            className="border border-gray-700 rounded-xl p-2 flex flex-col items-center bg-gray-900 hover:bg-gray-700 print:bg-transparent transition"
        >
            <span className="text-xs font-bold text-gray-300 print:text-slate-950">
            {moment({ year: currentYear, month: currentMonth, day: i + 1 }).format("DD")}
            </span>
            {day.entry || day.exit ? (
            <div className="mt-2 space-y-1 text-center">
                <div className="flex items-center space-x-1">
                {statusInfo[day.entry?.status as AttendanceStatus]?.icon}
                    <div className="w-full flex justify-between">
                        <span className="text-[10px] text-gray-400 print:text-slate-950">Entrada</span>
                        <span className="text-[10px] text-gray-400 print:text-slate-950">{day.entry?.time}</span>
                    </div>
                </div>
                <div className="flex items-center space-x-1">
                {day.exit && statusInfo[day.exit.status as AttendanceStatus]?.icon}
                {day.exit && <div className="w-full flex justify-between">
                    <span className="text-[10px] text-gray-400 print:text-slate-950">Salida</span>
                    <span className="text-[10px] text-gray-400 print:text-slate-950">{day.exit?.time}</span>
                </div>}

                </div>
            </div>
            ) : (
            <span className="text-[10px] text-gray-500 mt-2">No data</span>
            )}
        </div>
        ))}
        </div>
            {/* Legend */}
            <div className="mt-8 pb-2 w-full flex items-center justify-evenly text-sm text-gray-300 print:text-slate-950">
                {Object.entries(statusInfo).map(([key, { label, icon }]) => (
                <div key={key} className="flex items-center space-x-2">
                    {icon}
                    <span>{label}</span>
                </div>
                ))}
            </div>
</>
  )
}

export default AttendanceCalendarCard