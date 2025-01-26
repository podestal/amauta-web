import { RiArrowDownSFill, RiArrowLeftCircleFill, RiArrowRightCircleFill } from "@remixicon/react"
import useLanguageStore from "../../../../hooks/store/useLanguageStore"
import useAuthStore from "../../../../hooks/store/useAuthStore"
import useGetStudents from "../../../../hooks/api/student/useGetStudents"
import { statusStyles } from "../../attendance/AttendanceStatus"
import { useEffect, useState } from "react"
import moment from "moment"

interface Props {
    selectedClassroom: string
}

const AttendanceReportTable = ({ selectedClassroom }: Props) => {

    const lan = useLanguageStore(s => s.lan)
    const access = useAuthStore(s => s.access) || ''
    const [selectedWeek, setSelectedWeek] = useState(moment().week().toString())


    useEffect(() => {
        console.log('selectedWeek', selectedWeek);
        
    }, [selectedWeek])
    const getWeekDays = (week: number) => {
        const year = moment().year()
        const startOfWeek = moment().year(year).week(week).startOf('isoWeek')
        return Array.from({ length: 5 }, (_, i) => startOfWeek.clone().add(i, 'days'))

    }

    const { data: students, isLoading, isError, error, isSuccess } = useGetStudents({ access, classroomId: selectedClassroom, week: selectedWeek })

    const handleNextWeek = () => {
        if (parseInt(selectedWeek) < 52) {
            setSelectedWeek((parseInt(selectedWeek) + 1).toString())
        }
    }

    const handlePrevWeek = () => {
        if (parseInt(selectedWeek) > 1) {
            setSelectedWeek((parseInt(selectedWeek) - 1).toString())
        }
    }

    const weekDays = getWeekDays(parseInt(selectedWeek))

    if (isLoading) return <p className="text-2xl text-center my-10 animate-pulse">{lan === 'EN' ? 'Loading ...' : 'Cargando ...'}</p>

    if (isError) return <p>Error {error.message}</p>

    if (isSuccess && students.length > 0)

  return (
    <>
    <div className="w-full grid grid-cols-12 dark:bg-slate-900 bg-gray-200 font-bold px-2 py-6">
            {/* <div className="flex py-1 text-left hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer">
                
            </div> */}
            <div className="flex py-1 text-left hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer">
                <p>{lan === 'EN' ? 'UID' : 'UID'}</p> 
            </div>
            <div className="flex py-1 text-left col-span-2 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer">
                <p>{lan === 'EN' ? 'Name' : 'Nombres'}</p>
                <RiArrowDownSFill 
                    // className={`${sortKey === 'category_name' && sortOrder === 'desc' ? 'rotate-180' : ''}`}
                />
            </div>
            <div className="flex py-1 text-left col-span-2 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer">
                <p>{lan === 'EN' ? 'Lastname' : 'Apellidos'}</p>
                <RiArrowDownSFill 
                    // className={`${sortKey === 'created_at' && sortOrder === 'desc' ? 'rotate-180' : ''}`}
                />
            </div>
            <div>
                <RiArrowLeftCircleFill 
                    className="text-blue-600 hover:text-blue-800 cursor-pointer"
                    onClick={handlePrevWeek}
                />
            </div>
            {weekDays.map((day, index) => (
                <div key={index} className="flex py-1 text-left hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer">
                    <p>{lan === 'EN' ? day.format('ddd') : day.format('ddd')}</p>
                </div>
            ))}
            {/* <div className="flex py-1 text-left hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer">
                <p>{lan === 'EN' ? 'Mon' : 'Lun 20'}</p>
            </div>
            <div className="flex py-1 text-left hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer">
                <p>{lan === 'EN' ? 'Tue' : 'Mar 21'}</p>
            </div>
            <div className="flex py-1 text-left hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer">
                <p>{lan === 'EN' ? 'Wed' : 'Mie 22'}</p>
            </div>
            <div className="flex py-1 text-left hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer">
                <p>{lan === 'EN' ? 'Thu' : 'Jue 23'}</p>
            </div>
            <div className="flex py-1 text-left hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer">
                <p>{lan === 'EN' ? 'Fri' : 'Vie 24'}</p>
            </div> */}
            <div>
                <RiArrowRightCircleFill 
                    className="text-blue-600 hover:text-blue-800 cursor-pointer"
                    onClick={handleNextWeek}
                />
            </div>
        </div>
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
                {student.attendances_in && student.attendances_in.map((attendance_in, index) => (
                    <div key={index}  className="w-full flex justify-left items-center gap-2">
                        <div className={`w-8 h-8 flex justify-center items-center ${statusStyles[attendance_in.status]} rounded-lg`}>
                            {attendance_in.status}
                        </div>
                        <div className={`w-8 h-8 flex justify-center items-center ${statusStyles[student.attendances_out[index].status]} rounded-lg`}>
                            {student.attendances_out[index].status}
                        </div>
                    </div>
                ))}
                <div>

                </div>
            </div>
        ))}
        
    </>
  )
  else return <p className="text-2xl text-center my-10">{lan === 'EN' ? 'No students found in this classroom' : 'No se encontraron alumnos en esta clase'}</p>
}

export default AttendanceReportTable