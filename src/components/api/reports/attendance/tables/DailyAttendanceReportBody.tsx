import useGetStudents from "../../../../../hooks/api/student/useGetStudents"
import useAuthStore from "../../../../../hooks/store/useAuthStore"
import useLanguageStore from "../../../../../hooks/store/useLanguageStore"
import getAttendanceLabel from "../../../../../utils/getAttendanceLabel"
import getTitleCase from "../../../../../utils/getTitleCase"
import AttendanceStatus from "../../../attendance/AttendanceStatus"

interface Props {
    selectedClassroom: string
    selectedDay: string
    currentMonth: string
}

const DailyAttendanceReportBody = ({ selectedClassroom, selectedDay, currentMonth }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const lan = useLanguageStore(s => s.lan)
    
    const { data: students, isLoading, isError, error, isSuccess } = useGetStudents({ access, classroomId: selectedClassroom, day: selectedDay, month: currentMonth })


    if (isLoading) return <p className="text-2xl text-center my-10 animate-pulse">{lan === 'EN' ? 'Loading ...' : 'Cargando ...'}</p>

    if (isError) return <p>Error {error.message}</p>

    if (isSuccess && students.length > 0)

  return (
    <div>
        {students
            .sort((a, b) => a.last_name.localeCompare(b.last_name))
            .map( student => (
            <div
                key={student.uid}
                className="w-full grid grid-cols-12 px-2 py-6 font-palanquin text-left hover:bg-slate-200 dark:hover:bg-slate-900"
            >
                <div className="flex justify-start items-start">
                    <p>{student.uid}</p>
                </div>
                <div className="flex justify-start items-start col-span-2">
                    <p>{student.last_name && getTitleCase(student.last_name.toLocaleLowerCase())}</p>
                </div>
                <div className="flex justify-start items-start col-span-2">
                    <p>{student.first_name && getTitleCase(student.first_name.toLocaleLowerCase())}</p>
                </div>
                <div className="col-span-2 mr-6">
                    {student.attendances_in.length > 0 
                    ?
                    <>
                        {student.attendances_in.map( attendance => (
                            <AttendanceStatus 
                                key={attendance.id}
                                status={attendance.status}
                                label={getAttendanceLabel({lan, attendance: attendance.status})}
                                canModify={false}
                                onClick={() => {}}
                            />
                        ))}
                    </>
                    : 
                    <div className="py-4 px-4 text-center font-bold rounded-2xl text-xs cursor-pointer flex items-center justify-center space-x-2 dark:bg-gray-700 bg-gray-400 shadow-2xl shadow-slate-500">Sin Datos</div>}
                </div>
                <div className="col-span-2 mr-6">
                    {student.attendances_out.length > 0 
                    ?
                    <>
                        {student.attendances_out.map( attendance => (
                            <AttendanceStatus 
                                key={attendance.id}
                                status={attendance.status}
                                label={getAttendanceLabel({lan, attendance: attendance.status})}
                                canModify={false}
                                onClick={() => {}}
                            />
                        ))}
                    </>
                    : 
                    <div className="py-4 px-4 text-center font-bold rounded-2xl text-xs cursor-pointer flex items-center justify-center space-x-2 dark:bg-gray-700 bg-gray-400 shadow-2xl shadow-slate-500">Sin Datos</div>}
                </div>
                <div className="col-span-3 overflow-scroll flex flex-col gap-2">
                    
                    {/* <p className="text-xs">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident dolorem soluta beatae exercitationem modi vitae quisquam aut rerum consectetur itaque. Vel nobis ratione eum atque, a cupiditate enim velit eligendi.</p> */}
                    {student.attendances_in.length > 0 && <p className="text-xs"><span className="font-bold">Observaciones Entrada:</span> {student.attendances_in[0].observations ? student.attendances_in[0].observations : '-' }</p>}
                    {student.attendances_out.length > 0 && <p className="text-xs"><span className="font-bold">Observaciones Salida:</span> {student.attendances_out[0].observations ? student.attendances_out[0].observations : '-'}</p>}
                </div>
            </div>
        ))}
    </div>
  )
}

export default DailyAttendanceReportBody