import { useState } from "react"
import QRScanner from "../components/ui/QRScanner"
import Selector from "../components/ui/Selector"
import useLanguageStore from "../hooks/store/useLanguageStore"
import { getAttendanceStatus } from "../utils/data"

const AttendancePage = () => {

  const [selectedStatus, setSelectedStatus] = useState('')
  const lan = useLanguageStore(s => s.lan)
  const attendanceStatus = getAttendanceStatus(lan)

  console.log('selectedStatus',selectedStatus)
  

  const handleSuccess = (decodedText: string) => {
    console.log(decodedText)
    
  }

  return (
    <div className="w-full min-h-screen max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1280px] mx-auto overflow-hidden h-screen flex flex-col justify-center items-center">
      <h2 className="mb-20 text-4xl">Scanear Asistencia</h2>
      <Selector 
        values={attendanceStatus}
        setter={setSelectedStatus}
        label="Status"
      />
      <QRScanner 
        onScanSuccess={handleSuccess}
        selectedStatus={selectedStatus}
      />
    </div>
  )
}

export default AttendancePage

// const lan = useLanguageStore(s => s.lan)
// const attendanceStatus = getAttendanceStatus(lan)

// return (
// <div className="w-full">
//     <Selector 
//         values={attendanceStatus}
//         setter={setSelectedStatus}
//         defaultValue={selectedStatus}
//         label={'Status'}
//     />
// </div>