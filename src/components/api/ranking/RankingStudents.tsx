import useGetStudentsByQuarterGrade from "../../../hooks/api/student/useGetStudentsByQuarterGrade"
import useAuthStore from "../../../hooks/store/useAuthStore"
import { competencies } from "../../../data/mockdataForGrades"
import getFinalGrade from "../../../utils/getFinalGrade"

// access: string
// classroomId : string
// competencies: string[]
// assignatureId: string
// quarter: string

interface Props {
    classroomId : string
    quarter: string
}

const RankingStudents = ({ classroomId, quarter }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const competenciesIds = competencies.map(competency => (competency.id).toString())
    const {data: students, isLoading, isError, error, isSuccess} = useGetStudentsByQuarterGrade({ access, classroomId, quarter, competencies: competenciesIds, assignatureId: '' })

    if (isLoading) return <p className="text-center animate-pulse">Cargando...</p>
    if (isError) return <p className="text-center text-red-500">Error: {error.message}</p>
    if (isSuccess) 

  return (
    <div>
        {/* <>{console.log('students', students)}</>s */}
        {students && students.map(student => {
            const finalGrade = getFinalGrade({ student })
            return (
                <div key={student.uid} className="flex flex-col justify-center items-center bg-white dark:bg-slate-800 shadow-md rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white text-lg font-bold">
                            {student.first_name}
                        </div>
                        <div>
                            <p className="text-lg font-medium text-gray-900 dark:text-gray-100">{student.first_name}</p>
                            <p>{finalGrade}</p>
                        </div>
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default RankingStudents


// {sortedStudents.map((student, idx) => (
//     <motion.div
//       key={student.id}
//       initial={{ opacity: 0, x: -20 }}
//       animate={{ opacity: 1, x: 0 }}
//       exit={{ opacity: 0, x: -20 }}
//       onClick={() => { 
//         handleStudentClick(student)
//         setTimeout(() => {
//             navigate(`${student.id}`, { state: { student } });
//         }, 700);
//     }}
//       className="student-card grid grid-cols-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200"
//     >
//             <div className='flex items-center gap-2 col-span-3 '>
//                 <p className="text-sm text-slate-50 bg-blue-600 h-full w-10 flex justify-center items-center rounded-l-2xl">{idx + 1}.</p>
//                 <div className="mx-1 w-12 h-12 bg-gray-900  rounded-full flex items-center justify-center text-white text-lg font-bold">
//                     {/* {student.name?.[0]}{student.name?.[1].toLocaleUpperCase()} */}
//                     {student.name.split(' ').map((n) => n[0]).join('').toLocaleUpperCase()}
//                 </div>
//                 <div>
//                     <p className="text-lg font-medium text-gray-900 dark:text-gray-100">{student.name}</p>
//                     <p className="text-sm text-gray-500 dark:text-gray-400">Promedio: {student.grade}</p>
//                 </div>
//             </div>
//             <div className=' flex justify-start items-center gap-2 col-span-2'>
                
//             </div>
//             <div className='flex justify-center items-center col-span-1'>
//                 {trendIcon(student.trend)}
//             </div>
//     </motion.div>
//   ))}