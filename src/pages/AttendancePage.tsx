// import { useState } from "react"
// import QRScanner from "../components/ui/QRScanner"
// import Selector from "../components/ui/Selector"
// import useLanguageStore from "../hooks/store/useLanguageStore"
// import { getAttendanceStatus } from "../utils/data"
// import useCreateAttendance from "../hooks/api/attendance/useCreateAttendance"
// import useAuthStore from "../hooks/store/useAuthStore"
// import useInstructorStore from "../hooks/store/useInstructorStore"

// const AttendancePage = () => {

//   const [selectedStatus, setSelectedStatus] = useState('')
//   const lan = useLanguageStore(s => s.lan)
//   const attendanceStatus = getAttendanceStatus(lan)
//   const access = useAuthStore(s => s.access) || ''
//   const createAttendance = useCreateAttendance({ classroomId: '1' })
//   const instructor = useInstructorStore(s => s.instructor)
  

//   const handleSuccess = (decodedText: string) => {
//     console.log(decodedText)
//     createAttendance.mutate({attendance: {
//       status: selectedStatus, 
//       student: decodedText, 
//       created_by: `${instructor?.first_name} ${instructor?.last_name}`, 
//       }, access})
    
//   }

//   return (
//     <div className="w-full min-h-screen max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1280px] mx-auto overflow-hidden h-screen flex flex-col justify-center items-center">
//       <h2 className="mb-20 text-4xl">Scanear Asistencia</h2>
//       <Selector 
//         values={attendanceStatus}
//         setter={setSelectedStatus}
//         label="Status"
//       />
//       <QRScanner 
//         onScanSuccess={handleSuccess}
//         selectedStatus={selectedStatus}
//       />
//     </div>
//   )
// }

// export default AttendancePage

import useLanguageStore from "../hooks/store/useLanguageStore";
import useCreateAttendance from "../hooks/api/attendance/useCreateAttendance";
import AttendanceScanForm from "../components/api/attendance/AttendanceScanForm";
// import useInstructorStore from "../hooks/store/useInstructorStore";
// import { useState } from "react";

const AttendancePage = () => {
  // const instructor = useInstructorStore(s => s.instructor)
  const lan = useLanguageStore(s => s.lan)
  const createAttendance = useCreateAttendance({ classroomId: '1' })




  return (
    <div className="w-full min-h-screen max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1280px] mx-auto overflow-hidden h-screen flex flex-col justify-start items-center pt-20">
      <h2 className="mb-20 text-4xl">{lan === 'EN' ? 'Scann Attendance' : 'Scanear Asistencia'}</h2>
      <AttendanceScanForm 
        createAttendance={createAttendance}
      />
    </div>
  );
};

export default AttendancePage;