import { motion } from "framer-motion"
import useGetAttendance from "../../../hooks/api/attendance/useGetAttendance"
import useAuthStore from "../../../hooks/store/useAuthStore"
import useLanguageStore from "../../../hooks/store/useLanguageStore"
import DayAttendance from "./DayAttendance"

interface Props {
    studentId: string
    selectedMonth: string
}


const TutorAttedences = ({ studentId, selectedMonth }: Props) => {

    const access = useAuthStore(s=>s.access) || ''
    const lan = useLanguageStore(s=>s.lan)

    const itemVariants = {
        hidden: { opacity: 0, x: 50 }, 
        visible: { opacity: 1, x: 0 }, 
      };
    
    const {data: attendances, isLoading, isError, error, isSuccess} = useGetAttendance({ access, studentId, month: selectedMonth })
    
    if (isLoading) return <h2 className="text-2xl animate-pulse text-center my-10">{lan === 'EN' ? 'Loading ...' : 'Cargando ...'}</h2>

    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess) 

  return (
    <div className="w-full mb-20">
      {attendances.length > 0 ? (
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1 }}
          className="dark:bg-slate-900 shadow rounded overflow-y-scroll mb-10 h-[700px]"
        >
          {attendances.map((attendance) => (
            <DayAttendance key={attendance.id} attendance={attendance} />
          ))}
        </motion.div>
      ) : (
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="text-center my-10"
        >
          <p>
            {lan === 'EN'
              ? 'No attendance records for this month.'
              : 'No hay registros de asistencia para este mes.'}
          </p>
        </motion.div>
      )}
    </div>

  )
}

export default TutorAttedences