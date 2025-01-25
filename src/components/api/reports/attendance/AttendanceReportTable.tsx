import { RiArrowDownSFill } from "@remixicon/react"
import useLanguageStore from "../../../../hooks/store/useLanguageStore"
import useAuthStore from "../../../../hooks/store/useAuthStore"
import useGetStudents from "../../../../hooks/api/student/useGetStudents"

interface Props {
    selectedClassroom: string
}

const AttendanceReportTable = ({ selectedClassroom }: Props) => {

    const lan = useLanguageStore(s => s.lan)
    const access = useAuthStore(s => s.access) || ''
    const { data: students, isLoading, isError, error, isSuccess } = useGetStudents({ access, classroomId: selectedClassroom })

    if (isLoading) return <p className="text-2xl text-center my-10 animate-pulse">{lan === 'EN' ? 'Loading ...' : 'Cargando ...'}</p>

    if (isError) return <p>Error {error.message}</p>

    if (isSuccess)

  return (
    <>
    <div className="w-full grid grid-cols-12 dark:bg-slate-900 bg-gray-200 font-bold px-2 py-6">
            <div className="flex py-1 text-left hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer">
                
            </div>
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
            <div className="flex py-1 text-left hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer">
                <p>{lan === 'EN' ? 'Mon' : 'Lun'}</p>
            </div>
            <div className="flex py-1 text-left hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer">
                <p>{lan === 'EN' ? 'Tue' : 'Mar'}</p>
            </div>
            <div className="flex py-1 text-left hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer">
                <p>{lan === 'EN' ? 'Wed' : 'Mie'}</p>
            </div>
            <div className="flex py-1 text-left hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer">
                <p>{lan === 'EN' ? 'Thu' : 'Jue'}</p>
            </div>
            <div className="flex py-1 text-left hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer">
                <p>{lan === 'EN' ? 'Fri' : 'Vie'}</p>
            </div>
        </div>
        {students.map( student => (
            <div 
                key={student.uid}
                className="w-full grid grid-cols-12 px-2 py-4 font-palanquin text-left hover:bg-slate-100 dark:hover:bg-slate-900">
                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-blue-800 to-slate-900 rounded-full dark:text-slate-50 font-bold text-md overflow-hidden">
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
                </div>
                <div className="flex justify-start items-center">
                    <p>{student.uid}</p>
                </div>
                <div className="flex justify-start items-center col-span-2">
                    <p>{student.first_name}</p>
                </div>
                <div className="flex justify-start items-center col-span-2">
                    <p>{student.last_name}</p>
                </div>
                <div className="w-full flex justify-left items-center gap-2">
                    <div className="w-8 h-8 bg-red-600 shadow-xl shadow-red-600" />
                    <div className="w-8 h-8 bg-red-600 shadow-xl shadow-red-600" />
                </div>
                <div className="w-full flex justify-left items-center gap-2">
                    <div className="w-8 h-8 bg-red-600 shadow-xl shadow-red-600" />
                    <div className="w-8 h-8 bg-red-600 shadow-xl shadow-red-600" />
                </div>
                <div className="w-full flex justify-left items-center gap-2">
                    <div className="w-8 h-8 bg-red-600 shadow-xl shadow-red-600" />
                    <div className="w-8 h-8 bg-red-600 shadow-xl shadow-red-600" />
                </div>
                <div className="w-full flex justify-left items-center gap-2">
                    <div className="w-8 h-8 bg-red-600 shadow-xl shadow-red-600" />
                    <div className="w-8 h-8 bg-red-600 shadow-xl shadow-red-600" />
                </div>
                <div className="w-full flex justify-left items-center gap-2">
                    <div className="w-8 h-8 bg-red-600" />
                    <div className="w-8 h-8 bg-red-600" />
                </div>
            </div>
        ))}
        
    </>
  )
}

export default AttendanceReportTable