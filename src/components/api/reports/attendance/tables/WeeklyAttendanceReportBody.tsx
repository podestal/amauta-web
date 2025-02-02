import moment from "moment"
import useGetStudents from "../../../../../hooks/api/student/useGetStudents"
import useAuthStore from "../../../../../hooks/store/useAuthStore"
import useLanguageStore from "../../../../../hooks/store/useLanguageStore"
import { statusStyles } from "../../../attendance/AttendanceStatus"

interface Props {
    weekDays: moment.Moment[]
    selectedClassroom: string
    selectedWeek: string
}

const WeeklyAttendanceReportBody = ({ weekDays, selectedClassroom, selectedWeek }: Props) => {
    const access = useAuthStore(s => s.access) || ''
    const lan = useLanguageStore(s => s.lan)
    console.log(moment().week());
    
    console.log('weekDays', weekDays);
    console.log('is same',moment('2025-01-01T00:00:00-05:00').isSame(weekDays[0], "day"));
    
    

    const { data: students, isLoading, isError, error, isSuccess } = useGetStudents({ access, classroomId: selectedClassroom, week: selectedWeek })

    if (isLoading) return <p className="text-2xl text-center my-10 animate-pulse">{lan === 'EN' ? 'Loading ...' : 'Cargando ...'}</p>

    if (isError) return <p>Error {error.message}</p>

    if (isSuccess && students.length > 0)

  return (
    <>
    {/* <>{console.log('students', students)}</> */}
    {students.map( student => (
        <div 
            key={student.uid}
            className="w-full grid grid-cols-12 px-2 py-4 font-palanquin text-left hover:bg-slate-100 dark:hover:bg-slate-900">
            {/* <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-blue-800 to-slate-900 rounded-full dark:text-slate-50 font-bold text-md overflow-hidden">
                {student.picture ? (
                    <img 
                    src={student.picture || `https://ui-avatars.com/api/?name=${student.first_name}+${student.last_name}&background=random`} 
                    alt={`${student.first_name} ${student.last_name}`} 
                    className="w-full h-full object-cover rounded-full"
                    />
                ) : (
                    <span>
                    {student.first_name[0]}{student.last_name[0]}
                    </span>
                )}
            </div> */}
            <div className="flex justify-start items-center">
                <p>{student.uid}</p>
            </div>
            <div className="flex justify-start items-center col-span-2">
                <p>{student.first_name}</p>
            </div>
            <div className="flex justify-start items-center col-span-2">
                <p>{student.last_name}</p>
            </div>
            <div>
                
            </div>
            {weekDays.map((day, index) => {
                const attendanceIn = student.attendances_in.find((attendance) => {
                    // console.log('attendance', attendance)
                    // console.log('day', day)
                    // console.log('moment(attendance.created_at)', moment(attendance.created_at).isSame(day, "day"));
                    
                    
                    return moment(attendance.created_at).isSame(day, "day")
                }
                    
                );
                const attendanceOut = student.attendances_out.find((attendance) =>
                    moment(attendance.created_at).isSame(day, "day")
                );

                console.log('attendanceIn', attendanceIn);
                

                return (
                    <div key={index} className="w-full flex justify-left items-center gap-2">
                        <div
                            className={`w-8 h-8 flex justify-center items-center ${
                                attendanceIn ? statusStyles[attendanceIn.status] : "dark:bg-gray-700 bg-gray-400"
                            } rounded-lg`}
                        >
                           <p className="text-white font-bold">E</p>
                        </div>
                        <div
                            className={`w-8 h-8 flex justify-center items-center ${
                                attendanceOut ? statusStyles[attendanceOut.status] : "dark:bg-gray-700 bg-gray-400"
                            } rounded-lg`}
                        >
                            <p className="text-white font-bold">S</p>
                        </div>
                    </div>
                );
            })}
            <div>

            </div>
        </div>
    ))}
    </>
  )
  else return <p className="text-2xl text-center my-10">{lan === 'EN' ? 'No students found in this classroom' : 'No se encontraron alumnos en esta clase'}</p>
}

export default WeeklyAttendanceReportBody