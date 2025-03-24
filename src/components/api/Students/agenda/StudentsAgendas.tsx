import { useState } from "react"
import AttendanceFilters from "../../reports/attendance/AttendanceFilters"
import StudentAgendasList from "./StudentAgendasList"

const StudentsAgendas = () => {

    const [selectedClassroom, setSelectedClassroom] = useState('')

  return (
    <div>
        <>{console.log('selectedClassroom', selectedClassroom)}</>
        <AttendanceFilters 
            setSelectedClassroom={setSelectedClassroom}
            selectedType={''}
            setSelectedType={() => {}}
            setClassrooms={() => {}}
            onlyclassroom
        />
        <StudentAgendasList 
            classroom={selectedClassroom}
        />
    </div>
  )
}

export default StudentsAgendas