import { motion } from "framer-motion"
import useGetAttendance from "../../../../hooks/api/attendance/useGetAttendance"
import useAuthStore from "../../../../hooks/store/useAuthStore"
import useLanguageStore from "../../../../hooks/store/useLanguageStore"
import AttendanceSummaryCard from "./AttendanceSummaryCard"

interface Props {
    selectedClassroom: string
    selectedWeek?: string
    selectedDay?: string
    currentMonth?: string
}

const variantsDown = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
}

const variantsUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
}

const AttendanceSummary = ({ selectedClassroom, selectedWeek, selectedDay, currentMonth }: Props) => {

    const lan = useLanguageStore(s => s.lan)
    const access = useAuthStore(s => s.access) || ''
    

    const {data: attendances, isLoading, isError, error, isSuccess} = useGetAttendance({ access, classroomId:selectedClassroom, day: selectedDay, month: currentMonth, week: selectedWeek })

    if (isLoading) return <p className="text-2xl text-center my-10 animate-pulse">{lan === 'EN' ? 'Loading ...' : 'Cargando ...'}</p>

    if (isError) return <p>Error {error.message}</p>

    if (isSuccess)

  return (
    <div className="w-full my-12 mx-auto flex flex-col gap-12">
        {/* <>{console.log(attendances)}</> */}
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={variantsDown}
            transition={{ duration: 0.5 }}
            className="flex justify-between items-center gap-12">
            <AttendanceSummaryCard 
                attendances={attendances}
                status="O"
            />
            <AttendanceSummaryCard 
                attendances={attendances}
                status="N"
            />
            <AttendanceSummaryCard 
                attendances={attendances}
                status="E"
            />
        </motion.div>
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={variantsUp}
            transition={{ duration: 0.5 }}
            className="flex justify-evenly items-center gap-12">
            <AttendanceSummaryCard 
                attendances={attendances}
                status="L"
            />
            <AttendanceSummaryCard 
                attendances={attendances}
                status="T"
            />
        </motion.div>
    </div>
  )
}

export default AttendanceSummary