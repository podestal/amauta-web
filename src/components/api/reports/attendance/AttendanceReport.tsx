import AttendanceFilters from "./AttendanceFilters"
import { useState } from "react"
import AttendanceReportTable from "./AttendanceReportTable"
import useLanguageStore from "../../../../hooks/store/useLanguageStore"
import AttendanceSummary from "./AttendanceSummary"



const AttendanceReport = () => {

    const lan = useLanguageStore(s => s.lan)
    const [selectedClassroom, setSelectedClassroom] = useState('')

    console.log('selectedClassroom', selectedClassroom);
    



  return (
    <div className="py-12">
        <h2 className="text-4xl mb-16 text-center font-bold">{lan === 'EN' ? 'Attendance Report' : 'Reporte de Asistencia'}</h2>
        <AttendanceFilters 
            setSelectedClassroom={setSelectedClassroom}
        />
        <AttendanceSummary />
        {selectedClassroom && 
        <AttendanceReportTable 
            selectedClassroom={selectedClassroom}
        />}
        
    </div>
  )
}

export default AttendanceReport