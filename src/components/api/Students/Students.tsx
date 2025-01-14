import { useState } from "react"
import useGetStudents from "../../../hooks/api/student/useGetStudents"
import useAuthStore from "../../../hooks/store/useAuthStore"
import StudentCard from "./StudentCard"
import StudentFilter from "./StudentFilter"
import useLoader from "../../../hooks/ui/useLoader"
import { motion } from "framer-motion"

interface Props {
    classroom?: string
}

const Students = ({ classroom }: Props) => {

    const [filter, setFilter] = useState('')
    const access = useAuthStore(s => s.access) || ''
    const classroomId = classroom ? classroom : ''
    const {data: students, isLoading, isError, error, isSuccess} = useGetStudents({ access, classroomId })

    useLoader(isLoading)

    if (isError) return <p>Error {error.message}</p>

    if (isSuccess)

  return (
    <div className="pt-10 pb-20">
        <h2 className="text-3xl font-bold text-center">Alumnos</h2>
        <StudentFilter 
            filter={filter}
            setFilter={setFilter}
        />
        <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.1 }}
        >
            {students
                .filter( student => `${student.first_name.toLowerCase()}${student.last_name.toLowerCase()}`.includes(filter.toLowerCase()))
                .map( student => (
                <StudentCard 
                    key={student.uid}
                    student={student}
                    classroomId={classroomId}
                />
            ))}
        </motion.div>
    </div>
  )
}

export default Students