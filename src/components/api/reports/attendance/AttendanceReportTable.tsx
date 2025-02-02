import moment from "moment"
import AttendanceLegend from "./AttendanceLegend"
import WeeklyAttendanceReportHeader from "./tables/WeeklyAttendanceReportHeader"
import WeeklyAttendanceReportBody from "./tables/WeeklyAttendanceReportBody"
import DailyAttendanceReportHeader from "./tables/DailyAttendanceReportHeader"
import DailyAttendanceReportBody from "./tables/DailyAttendanceReportBody"
import { motion } from "framer-motion"
import MonthlyAttendanceReportHeader from "./tables/MonthlyAttendanceReportHeader"
import MonthlyAttendanceReportBody from "./tables/MonthlyAttendanceReportBody"

interface Props {
    selectedClassroom: string
    selectedType: string
    selectedWeek: string
    setSelectedWeek: React.Dispatch<React.SetStateAction<string>>
    selectedDay: string
    setSelectedDay: React.Dispatch<React.SetStateAction<string>>
    currentMonth: string
    setCurrentMonth: React.Dispatch<React.SetStateAction<string>>
    selectedMonth: string
    setSelectedMonth: React.Dispatch<React.SetStateAction<string>>

}

const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
}

const AttendanceReportTable = ({ 
    selectedClassroom, 
    selectedType, 
    selectedWeek,  
    setSelectedWeek,
    selectedDay,
    setSelectedDay,
    currentMonth,
    setCurrentMonth,
    selectedMonth,
    setSelectedMonth,

}: Props) => {


    const getWeekDays = (week: number) => {
        const year = moment().year();
        const startOfWeek = moment().year(year).week(week).startOf('week'); 
        return Array.from({ length: 5 }, (_, i) => startOfWeek.clone().add(i + 1, 'days')); 
    };
    

    const getDay = (day: number, month: number) => {
        return moment().date(day).month(month - 1)
    }

    const weekDays = getWeekDays(parseInt(selectedWeek))


  return (
    <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.5 }}
    >
        <AttendanceLegend />
        {selectedType === '3' &&
        <>
            <DailyAttendanceReportHeader 
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
                getDay={getDay}
                currentMonth={currentMonth}
                setCurrentMonth={setCurrentMonth}
            />
            <DailyAttendanceReportBody 
                selectedClassroom={selectedClassroom}
                selectedDay={selectedDay}
                currentMonth={currentMonth}
            />
        </>
        }
        {selectedType === '2' &&
        <>
            <WeeklyAttendanceReportHeader 
                weekDays={weekDays}
                selectedWeek={selectedWeek}
                setSelectedWeek={setSelectedWeek}
            />
            <WeeklyAttendanceReportBody
                weekDays={weekDays}
                selectedClassroom={selectedClassroom}
                selectedWeek={selectedWeek}
            />
        </>
        }
        {
        selectedType === '1' &&
            <>
                <MonthlyAttendanceReportHeader 
                    selectedMonth={selectedMonth}
                    setSelectedMonth={setSelectedMonth}
                />
                <MonthlyAttendanceReportBody 
                    selectedClassroom={selectedClassroom}
                    selectedMonth={selectedMonth}
                />
            </>
        }
    </motion.div>
  )
}

export default AttendanceReportTable