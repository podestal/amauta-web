import AttendanceFilters from "./AttendanceFilters"
import { useState } from "react"
import AttendanceReportTable from "./AttendanceReportTable"



const AttendanceReport = () => {

    const [selectedClassroom, setSelectedClassroom] = useState('')

    console.log('selectedClassroom', selectedClassroom);
    



  return (
    <>
        <AttendanceFilters 
            setSelectedClassroom={setSelectedClassroom}
        />
        {selectedClassroom && 
        <AttendanceReportTable 
            selectedClassroom={selectedClassroom}
        />}
        
    </>
  )
}

export default AttendanceReport