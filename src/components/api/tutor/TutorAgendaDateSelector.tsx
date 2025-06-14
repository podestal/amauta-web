import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import moment from 'moment'
import React from 'react'
import { monthInSpanish, daysInSpanish } from '../reports/attendance/tables/DailyAttendanceReportHeader'

interface Props {
    selectedDate: string
    setSelectedDate: React.Dispatch<React.SetStateAction<string>>
}

const TutorAgendaDateSelector = ({ selectedDate, setSelectedDate }: Props) => {

    const changeDate = (days: number) => {
        setSelectedDate((prev) => moment(prev).add(days, "days").format("YYYY-MM-DD"));
      };

  return (
    <div className="grid grid-cols-6 w-full gap-8 p-4 mb-4 bg-white shadow-lg rounded-2xl mx-auto text-center">
        <div 
        className="mx-auto"
        onClick={() => changeDate(-1)}>
        <ChevronLeft className="w-5 h-5 text-blue-500 hover:text-blue-600 cursor-pointer flex items-center" />
        </div>

        <div className="col-span-4 flex items-center justify-center gap-2 text-lg font-semibold text-gray-700">
        <Calendar className="w-5 h-5 text-blue-500" />
        {daysInSpanish[moment(selectedDate).format("ddd")] + ' ' + moment(selectedDate).format("DD") + ' de ' + monthInSpanish[moment(selectedDate).format("M")]}
        </div>

        <div 
        className="mx-auto"
        onClick={() => changeDate(1)}>
        <ChevronRight className="w-5 h-5 text-blue-500 hover:text-blue-600 cursor-pointer flex items-center" />
        </div>
    </div>
  )
}

export default TutorAgendaDateSelector