import moment from "moment"
import useGetStudents from "../../../../../hooks/api/student/useGetStudents"
import useAuthStore from "../../../../../hooks/store/useAuthStore"
import useLanguageStore from "../../../../../hooks/store/useLanguageStore"
import { statusStyles } from "../../../attendance/AttendanceStatus"

interface Props {
    selectedClassroom: string
    selectedMonth: string
}

const MonthlyAttendanceReportBody = ({ selectedClassroom, selectedMonth }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const lan = useLanguageStore(s => s.lan)
    const year = new Date().getFullYear()
    const totalDays = moment(`${year}-${selectedMonth}`, "YYYY-M").daysInMonth()
    const days =  Array.from({ length: totalDays }, (_, i) => 
        moment(`${year}-${selectedMonth}-${i + 1}`, "YYYY-M-D") // Create a moment instance for each day
    )

    const { data: students, isLoading, isError, error, isSuccess } = useGetStudents({ access, classroomId: selectedClassroom, month: selectedMonth })

    if (isLoading) return <p className="text-2xl text-center my-10 animate-pulse">{lan === 'EN' ? 'Loading ...' : 'Cargando ...'}</p>

    if (isError) return <p>Error {error.message}</p>

    if (isSuccess && students.length > 0)

  return (
<div>
        {/* <>{console.log('students', students)}</> */}
        {students.map( student => (
            <div
                key={student.uid}
                className="w-full grid grid-cols-12 px-2 py-6 font-palanquin text-left hover:bg-slate-100 dark:hover:bg-slate-900"
            >
                <div className="flex justify-start items-start">
                    <p>{student.uid}</p>
                </div>
                <div className="flex justify-start items-start col-span-2">
                    <p>{student.first_name}</p>
                </div>
                <div className="flex justify-start items-start col-span-2">
                    <p>{student.last_name}</p>
                </div>
                <div className="w-full col-span-7 gap-4">
                    <div className="grid grid-cols-31 text-center">
                        {days.map(day => {
                            const attendanceIn = student.attendances_in.find(attendance => moment(attendance.created_at).isSame(day, "day"))
                            const attendanceOut = student.attendances_out.find(attendance => moment(attendance.created_at).isSame(day, "day"))
                            return (

                                
                                <div 
                                    className="flex flex-col justify-center items-center"
                                    key={attendanceIn?.id} >
                                    <div 
                                        className={` w-8 h-4 flex justify-center items-center border-2 border-slate-950 ${attendanceIn?.status ? statusStyles[attendanceIn.status] : 'dark:bg-gray-700 bg-gray-400'}`}>
                                            <p className="text-[.6rem] font-bold text-white">E</p>
                                    </div>
                                    <div 
                                        className={` w-8 h-4 flex justify-center items-center border-2 border-slate-950 ${attendanceOut?.status ? statusStyles[attendanceOut.status] : 'dark:bg-gray-700 bg-gray-400'}`}>
                                            <p className="text-[.6rem] font-bold text-white">S</p>
                                    </div>
                                </div>
                            
                            )
                        })}
                    </div>
                </div>
            </div>
        ))}
    </div>
  )
}

export default MonthlyAttendanceReportBody