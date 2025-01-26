import { useState } from "react"
import moment from "moment"
import AttendanceReportHeader from "./AttendanceReportHeader"
import AttendanceReportBody from "./AttendanceReportBody"

interface Props {
    selectedClassroom: string
}

const AttendanceReportTable = ({ selectedClassroom }: Props) => {

    const [selectedWeek, setSelectedWeek] = useState(moment().week().toString())

    const getWeekDays = (week: number) => {
        const year = moment().year()
        const startOfWeek = moment().year(year).week(week).startOf('isoWeek')
        return Array.from({ length: 5 }, (_, i) => startOfWeek.clone().add(i, 'days'))

    }

    const weekDays = getWeekDays(parseInt(selectedWeek) +1)


  return (
    <>
        <AttendanceReportHeader 
            weekDays={weekDays}
            selectedWeek={selectedWeek}
            setSelectedWeek={setSelectedWeek}
        />
        <AttendanceReportBody 
            weekDays={weekDays}
            selectedClassroom={selectedClassroom}
            selectedWeek={selectedWeek}
        />
    </>
  )
}

export default AttendanceReportTable