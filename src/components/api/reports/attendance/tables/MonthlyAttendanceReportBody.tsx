import useGetStudents from "../../../../../hooks/api/student/useGetStudents"
import useAuthStore from "../../../../../hooks/store/useAuthStore"
import useLanguageStore from "../../../../../hooks/store/useLanguageStore"

interface Props {
    selectedClassroom: string
    selectedMonth: string
}

const MonthlyAttendanceReportBody = ({ selectedClassroom, selectedMonth }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const lan = useLanguageStore(s => s.lan)

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
                <div className="w-full col-span-7 flex flex-col justify-center items-center gap-4">
                    
                </div>
            </div>
        ))}
    </div>
  )
}

export default MonthlyAttendanceReportBody