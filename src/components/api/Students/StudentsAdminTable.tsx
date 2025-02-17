import { useState } from "react"
import useGetStudents from "../../../hooks/api/student/useGetStudents"
import useAuthStore from "../../../hooks/store/useAuthStore"
import Input from "../../ui/Input"
import { motion } from "framer-motion"
import StudentAdminCard from "./StudentAdminCard"
import { Classroom } from "../../../services/api/classroomService"
import moment from "moment"

interface Props {
    classroomId: string
    classrooms: Classroom[]
}

const StudentsAdminTable = ({ classroomId, classrooms }: Props) => {

    const today = moment().date()
    const access = useAuthStore(s => s.access) || ''
    const [studentFilter, setStudentFilter] = useState('')
    const {data: students, isLoading, isError, error, isSuccess} = useGetStudents({ access, classroomId, day: today.toString(), month: moment().month().toString() })

    if (isLoading) return <p className="animate-pulse text-2xl text-center py-20">Un Momento ...</p>

    if (isError) return <p>Error {error.message}</p>

    if (isSuccess)

  return (
    <div className="w-full flex flex-col gap-4">
        <Input 
            value={studentFilter}
            onChange={e => {
                setStudentFilter(e.target.value)
            }}
            placeholder="Buscar por nombre"
        />
        <div className="w-full grid grid-cols-10 text-lg font-bold gap-6 px-6 py-3 bg-gray-900 rounded-t-xl">
            <p className="col-span-3">Nombres y Apellidos</p>
            <p>Información Personal</p>
            <p>Información Nacimiento</p>
            <p>Información Salud</p>
            <p>Contacto Emergencia</p>
            <p>Información Padre</p>
            <p>Información Madre</p>
            <p>Información Apoderado</p>
        </div>
        <motion.div 
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.1 }}
            className="w-full flex flex-col gap-2">
            {students
                .filter( student => `${student.first_name.toLowerCase()}${student.last_name.toLowerCase()}`.includes(studentFilter.toLowerCase()))
                .map( student => (
                <StudentAdminCard 
                    key={student.uid}
                    student={student}
                    classrooms={classrooms}
                    classroomId={classroomId}
                />
            ))}
        </motion.div>
    </div>
  )
}

export default StudentsAdminTable