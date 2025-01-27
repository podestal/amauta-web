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

// O: '✅', // On Time
// L: '⏰', // Late
// N: '❌', // No Show
// E: '🛡️', // Excused
// T: '⚠️', // Tardy

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
        <div className="flex justify-between items-center gap-12">
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
        </div>
        <div className="flex justify-evenly items-center gap-12">
            <AttendanceSummaryCard 
                attendances={attendances}
                status="L"
            />
            <AttendanceSummaryCard 
                attendances={attendances}
                status="T"
            />
        </div>
    </div>
  )
}

export default AttendanceSummary