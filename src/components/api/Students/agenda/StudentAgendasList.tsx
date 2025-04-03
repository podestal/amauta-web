import { motion } from "framer-motion"
import useGetStudentByAgendas from "../../../../hooks/api/student/useGetStudentByAgendas"
import useAuthStore from "../../../../hooks/store/useAuthStore"
import useSchoolStore from "../../../../hooks/store/useSchoolStore"
import StudentAgendaCard from "./StudentAgendaCard"

interface Props {
    classroom: string
}

const StudentAgendasList = ({ classroom }: Props) => {

    const school = useSchoolStore(s => s.school).id
    const access = useAuthStore(s => s.access) || ''
    const { data: students, isLoading, isError, error, isSuccess } = useGetStudentByAgendas({ access, school: school.toString(), classroom })
    
    if (isLoading) return <p className="text-center animate-pulse my-8">Cargando...</p>

    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess)

  return (
    <motion.div 
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.1 }}
        className="w-full flex flex-col justify-center items-center gap-6">
        <>{console.log('students', students)}</>
        <h2 className="my-6 text-2xl font-bold">Agendas</h2>
        {students.map(student => (
            <StudentAgendaCard 
                key={student.uid}
                student={student}
                classroom={classroom}
            />
        ))}
    </motion.div>
  )
}

export default StudentAgendasList