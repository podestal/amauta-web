import { motion } from "framer-motion"
import useGetStudentsLastTen from "../../../hooks/api/student/useGetStudentsLastTen"
import useAuthStore from "../../../hooks/store/useAuthStore"
import StudentAdminCard from "./StudentAdminCard"
import { Classroom } from "../../../services/api/classroomService"

interface Props {
    school: number
    classrooms: Classroom[]

}

const StudentAdminTableLastTen = ({ school, classrooms }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const { data: students, isLoading, isError, error, isSuccess } = useGetStudentsLastTen({ access, school: school.toString() })

    if (isLoading) return <p className="animate-pulse text-2xl text-center py-20">Un Momento ...</p>

    if (isError) return <p>Error {error.message}</p>

    if (isSuccess)


  return (
    <motion.div
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.1 }}
        className="w-full flex flex-col gap-2"
    >
        <div className="hidden md:grid grid-cols-10 text-lg font-bold gap-6 px-6 py-3 bg-gray-900 rounded-t-xl">
            <p className="col-span-3">Nombres y Apellidos</p>
            <p>Información Personal</p>
            <p>Información Nacimiento</p>
            <p>Información Salud</p>
            <p>Contacto Emergencia</p>
            <p>Información Padre</p>
            <p>Información Madre</p>
            <p>Información Apoderado</p>
        </div>
        <>{console.log('last ten', students)}</>
        {students.map(student => (
            <StudentAdminCard 
                key={student.uid}
                student={student}
                classrooms={classrooms}
                classroomId={(student.clase.id).toString()}
            />
        ))}
    </motion.div>
  )
}

export default StudentAdminTableLastTen