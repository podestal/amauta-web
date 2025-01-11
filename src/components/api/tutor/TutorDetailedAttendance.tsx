import { useParams } from "react-router-dom";
import useGetAttendance from "../../../hooks/api/attendance/useGetAttendance";
import useAuthStore from "../../../hooks/store/useAuthStore";
import { Attendance } from "../../../services/api/attendanceService";
import useLanguageStore from "../../../hooks/store/useLanguageStore";
import getAttendanceLabel from "../../../utils/getAttendanceLabel";
import moment from "moment";
import MonthSelector from "../../ui/MonthSelector";
import { useState } from "react";

interface Props {
    attendance: Attendance;
  }
  
  const DayAttendance: React.FC<Props> = ({ attendance }) => {

    const lan = useLanguageStore(s=>s.lan)
    const attendanceLabel = getAttendanceLabel({ lan, attendance: attendance.status })
    const date = moment(attendance.created_at).format('DD-MM-YYYY')

    return (
      <div className="flex flex-col justify-between items-start p-4 border-b gap-4">
        <div className="w-full flex justify-between items-center">
          <span className="font-bold">{date}</span>
          <span className={`ml-2 
                ${attendance.status === 'O' && 'text-green-500'}
                ${attendance.status === 'L' && 'text-amber-500'}
                ${attendance.status === 'N' && 'text-red-500'}
                ${attendance.status === 'E' && 'text-green-500'}
                ${attendance.status === 'T' && 'text-yellow-500'}
            `}>
            {attendanceLabel}
          </span>
        </div>
        <div className="text-gray-400 italic text-">
            {lan === 'EN' ? 'Observation' : 'Observaciones'}: {attendance.observations ? attendance.observations : '-'}        
        </div>
      </div>
    );
  };
  

const TutorDetailedAttendance = () => {
    const params = useParams()
    const lan = useLanguageStore(s=>s.lan)
    const studentId = params.studentId
    const mcurrentMnth = new Date().getMonth() + 1
    const [selectedMonth, setSelectedMonth] = useState(mcurrentMnth.toString())

    const access = useAuthStore(s=>s.access) || ''
    
    const {data: attendances, isLoading, isError, error, isSuccess} = useGetAttendance({ access, studentId, month: selectedMonth })
    
    if (isLoading) return <h2 className="text-2xl animate-pulse text-center my-6">{lan === 'EN' ? 'Loading ...' : 'Cargando ...'}</h2>

    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess) 

    return (
      <div className="max-w-4xl mx-auto p-8 ">
        <h1 className="text-2xl font-bold mb-10 text-center">
            {lan === 'EN' ? 'Attendance' : 'Asistencia'}
        </h1>
        <div className="w-full my-4 flex justify-between items-center">
          <label className="font-medium text-lg">{lan === 'EN' ? 'Select Month:' : 'Selecciona un Mes'}</label>
          <MonthSelector 
            setSelectedMonth={setSelectedMonth}
          />
        </div>
        {attendances ? (
          <div className="dark:bg-slate-900 shadow rounded">
            {attendances.map((attendance) => (
              <DayAttendance 
                key={attendance.id} 
                attendance={attendance} />
            ))}
          </div>
        ) : (
          <div>No attendance data available for this month.</div>
        )}
      </div>
    );
}

export default TutorDetailedAttendance