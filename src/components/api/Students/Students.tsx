import { useState } from "react"
import useGetStudents from "../../../hooks/api/student/useGetStudents"
import useAuthStore from "../../../hooks/store/useAuthStore"
import StudentCard from "./StudentCard"
import StudentFilter from "./StudentFilter"
import useLoader from "../../../hooks/ui/useLoader"
import { motion } from "framer-motion"
import { useLocation, useParams } from "react-router-dom"
import useGetProfileStore from "../../../hooks/store/useGetProfileStore"
import { Instructor } from "../../../services/api/instructorService"
import StudentAdminCard from "./StudentAdminCard"

interface Props {
    classroom?: string
    level?: string
}

const Students = ({ classroom, level }: Props) => {

    const [filter, setFilter] = useState('')
    const access = useAuthStore(s => s.access) || ''
    const classroomId = classroom ? classroom : useLocation().state?.classroom
    const currentLevel = useLocation().state?.level || level
    const group = useGetProfileStore(s => s.user?.groups[0])
    const profile = useGetProfileStore(s => s.profile)
    const instructor = group === 'instructor' && profile as Instructor
    const canModifyAttendance = instructor && currentLevel === 'P'
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
            className="flex flex-col justify-center items-center gap-6"
        >
            {students
                .filter( student => `${student.first_name.toLowerCase()}${student.last_name.toLowerCase()}`.includes(filter.toLowerCase()))
                .map( student => (
                // Add a differentaition for admin and instructor
                // <StudentCard 
                //     key={student.uid}
                //     student={student}
                //     classroomId={classroomId}
                //     canModifyAttendance={instructor ? canModifyAttendance : true}
                // />
                <StudentAdminCard 
                    student={student}
                />
            ))}
        </motion.div>
    </div>
  )
}

export default Students