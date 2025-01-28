import AttendanceFilters from "./AttendanceFilters"
import { useState } from "react"
import AttendanceReportTable from "./AttendanceReportTable"
import useLanguageStore from "../../../../hooks/store/useLanguageStore"
import AttendanceSummary from "./AttendanceSummary"
import moment from "moment"



const AttendanceReport = () => {

    const lan = useLanguageStore(s => s.lan)
    const [selectedWeek, setSelectedWeek] = useState(moment().week().toString())
    const [selectedDay, setSelectedDay] = useState(moment().date().toString())
    const [currentMonth, setCurrentMonth] = useState((moment().month() + 1).toString())
    const [selectedClassroom, setSelectedClassroom] = useState('')
    console.log('currentMonth', currentMonth);
    const [selectedMonth, setSelectedMonth] = useState(currentMonth)
    const [selectedType, setSelectedType] = useState('2')
    

    console.log('selectedClassroom', selectedClassroom);
    console.log('days in month', moment(`${new Date().getFullYear()}-${selectedMonth}`).daysInMonth());
    



  return (
    <div className="py-12">
        <h2 className="text-4xl mb-16 text-center font-bold">{lan === 'EN' ? 'Attendance Report' : 'Reporte de Asistencia'}</h2>
        <AttendanceFilters 
            setSelectedClassroom={setSelectedClassroom}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
        />
        {selectedClassroom && 
        <>
          {selectedType === '2' && 
          <AttendanceSummary 
            selectedClassroom={selectedClassroom}
            selectedWeek={selectedWeek}
          />}
          {selectedType === '3' && 
          <AttendanceSummary 
            selectedClassroom={selectedClassroom}
            selectedDay={selectedDay}
            currentMonth={selectedMonth}
          />}
          {selectedType === '1' &&
          <AttendanceSummary 
            selectedClassroom={selectedClassroom}
            currentMonth={selectedMonth}
          />
          }
          <AttendanceReportTable 
            selectedClassroom={selectedClassroom}
            selectedType={selectedType}
            selectedWeek={selectedWeek}
            setSelectedWeek={setSelectedWeek}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
          />
        </>
        }
        
    </div>
  )
}

export default AttendanceReport