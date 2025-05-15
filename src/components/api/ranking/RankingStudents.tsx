import useAuthStore from "../../../hooks/store/useAuthStore"
import useGetStudentsByTotalScore from "../../../hooks/api/student/useGetStudentsByTotalScore"
import { motion } from "framer-motion"
import { StudentByTotalScore } from "../../../services/api/studentsService"
import { useNavigate } from "react-router-dom"
import gsap from 'gsap';
import Flip from 'gsap/Flip';

interface Props {
    classroomId : string
    quarter: string
}

const RankingStudents = ({ classroomId, quarter }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const navigate = useNavigate()

    const handleStudentClick = (student: StudentByTotalScore) => {
        gsap.context(() => {
        const listElements = gsap.utils.toArray('.student-card');
        const dropdown = document.querySelector('.dropdown-classroom');
        const title = document.querySelector('.ranking-title');
        const quarterSelector = document.querySelector('.quarter-selector');
        const clickedCard = document.getElementById(`student-${student.uid}`);
    
        const flipState = Flip.getState(clickedCard);
    
        // Animate list & dropdown out
        gsap.to(listElements, { opacity: 0, y: -50, stagger: 0.05, duration: 0.5 });
        gsap.to(dropdown, { opacity: 0, y: -20, duration: 0.3 });
        gsap.to(title, { opacity: 0, y: -20, duration: 0.3 });
        gsap.to(quarterSelector, { opacity: 0, y: -20, duration: 0.3 });
    
        // Animate clicked card to top position
        Flip.from(flipState, {
        scale: true,
        duration: 0.6,
        ease: 'power2.inOut',
        });
    })}

    const {data: students, isLoading, isError, error, isSuccess} = useGetStudentsByTotalScore({ access, classroomId, quarter })

    if (isLoading) return <p className="text-center animate-pulse">Cargando...</p>
    if (isError) return <p className="text-center text-red-500">Error: {error.message}</p>
    if (isSuccess) 

  return (
    <div className="space-y-4">
        {students && students
        .sort((a, b) => {
            if (a.average_numeric === b.average_numeric) {
                return a.first_name.localeCompare(b.first_name)
            }
            return b.average_numeric - a.average_numeric
        })
        .map((student, idx) => {
            return (
                <motion.div
                    key={student.uid}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onClick={() => { 
                        handleStudentClick(student)
                        setTimeout(() => {
                            navigate(`${student.uid}`, { state: { student } });
                        }, 700);
                    }}
                    className="student-card grid grid-cols-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200"
                    >
                            <div className='flex items-center gap-2 col-span-3 '>
                                <p className="text-sm text-slate-50 bg-blue-600 h-full w-10 flex justify-center items-center rounded-l-2xl">{idx + 1}.</p>
                                <div className="mx-1 w-12 h-12 bg-gray-900  rounded-full flex items-center justify-center text-white text-lg font-bold">
                                    {/* {student.name?.[0]}{student.name?.[1].toLocaleUpperCase()} */}
                                    {student.first_name.split(' ').map((n) => n[0]).join('').toLocaleUpperCase()}
                                </div>
                                <div>
                                    <p className="text-lg font-medium text-gray-900 dark:text-gray-100">{student.first_name} {student.last_name}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Promedio: {student.average_alphabetical}</p>
                                </div>
                            </div>
                            <div className=' flex justify-start items-center gap-2 col-span-2'>
                                
                            </div>
                            {/* <div className='flex justify-center items-center col-span-1'>
                                {trendIcon(student.trend)}
                            </div> */}
                    </motion.div>
            )
        })}
    </div>
  )
}

export default RankingStudents
