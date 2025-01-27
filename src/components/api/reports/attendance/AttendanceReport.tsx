import AttendanceFilters from "./AttendanceFilters"
import { useState } from "react"
import AttendanceReportTable from "./AttendanceReportTable"
import useLanguageStore from "../../../../hooks/store/useLanguageStore"
import AttendanceSummary from "./AttendanceSummary"
import moment from "moment"



const AttendanceReport = () => {

    const lan = useLanguageStore(s => s.lan)
    const [selectedWeek, setSelectedWeek] = useState(moment().week().toString())
    const [selectedClassroom, setSelectedClassroom] = useState('')
    const [selectedType, setSelectedType] = useState('2')

    console.log('selectedClassroom', selectedClassroom);
    



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
          <AttendanceSummary 
            selectedClassroom={selectedClassroom}
            selectedWeek={selectedWeek}
          />
          <AttendanceReportTable 
            selectedClassroom={selectedClassroom}
            selectedType={selectedType}
            selectedWeek={selectedWeek}
            setSelectedWeek={setSelectedWeek}
          />
        </>
        }
        
    </div>
  )
}

export default AttendanceReport