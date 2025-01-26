import { useState } from "react"
import moment from "moment"
import AttendanceLegend from "./AttendanceLegend"
import WeeklyAttendanceReportHeader from "./tables/WeeklyAttendanceReportHeader"
import WeeklyAttendanceReportBody from "./tables/WeeklyAttendanceReportBody"
import DailyAttendanceReportHeader from "./tables/DailyAttendanceReportHeader"
import DailyAttendanceReportBody from "./tables/DailyAttendanceReportBody"

interface Props {
    selectedClassroom: string
    selectedType: string
}

const AttendanceReportTable = ({ selectedClassroom, selectedType }: Props) => {

    const [selectedWeek, setSelectedWeek] = useState(moment().week().toString())
    const [selectedDay, setSelectedDay] = useState(moment().date().toString())
    const [currentMonth, setCurrentMonth] = useState((moment().month() + 1).toString())

    const getWeekDays = (week: number) => {
        const year = moment().year()
        const startOfWeek = moment().year(year).week(week).startOf('isoWeek')
        return Array.from({ length: 5 }, (_, i) => startOfWeek.clone().add(i, 'days'))
    }

    const getDay = (day: number, month: number) => {
        return moment().date(day).month(month - 1)
    }

    const weekDays = getWeekDays(parseInt(selectedWeek) +1)


  return (
    <>
        <AttendanceLegend 

        />
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
    </>
  )
}

export default AttendanceReportTable