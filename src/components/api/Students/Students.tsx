import { useState } from "react"
import useGetStudents from "../../../hooks/api/student/useGetStudents"
import useAuthStore from "../../../hooks/store/useAuthStore"
import StudentCard from "./StudentCard"
import StudentFilter from "./StudentFilter"
import { motion } from "framer-motion"
import { useLocation } from "react-router-dom"
import useGetProfileStore from "../../../hooks/store/useGetProfileStore"
import { Instructor } from "../../../services/api/instructorService"
import moment from "moment"
import useLoader from "../../../hooks/ui/useLoader"
import { RiDiscussFill } from "@remixicon/react"
import Modal from "../../ui/Modal"
import CreateAnnouncement from "../announcement/CreateAnnouncement"

interface Props {
    classroom?: string
    level?: string
}

const Students = ({ classroom, level }: Props) => {

    const today = moment().date()
    const [filter, setFilter] = useState('')
    const access = useAuthStore(s => s.access) || ''
    const classroomId = classroom ? classroom : useLocation().state?.classroom
    const currentLevel = useLocation().state?.level || level
    const group = useGetProfileStore(s => s.user?.groups[0])
    const profile = useGetProfileStore(s => s.profile)
    const instructor = group === 'instructor' && profile as Instructor
    const canModifyAttendance = instructor && currentLevel !== 'S' 

    const [open, setOpen] = useState(false)

    const {data: students, isLoading, isError, error, isSuccess} = useGetStudents({ access, classroomId, day: today.toString() })

    useLoader(isLoading)

    if (isError) return <p>Error {error.message}</p>

    if (isSuccess)

  return (
    <>
        <div className="pt-10 pb-20">
            <div className="w-full flex justify-center items-start gap-16">
                <h2 className="text-5xl font-bold text-center">Alumnos</h2>
                <RiDiscussFill 
                    size={40} 
                    className="text-5xl dark:text-gray-300 text-blue-600 cursor-pointer hover:text-blue-700 transition-all duration-300" 
                    onClick={() => setOpen(true)}
                />
            </div>
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
                    <StudentCard 
                        key={student.uid}
                        student={student}
                        classroomId={classroomId}
                        canModifyAttendance={instructor ? canModifyAttendance : true}
                    />
                ))}
            </motion.div>
        </div>
        <Modal
            isOpen={open}
            onClose={() => setOpen(false)}
        >
            <CreateAnnouncement 
                classroom={classroomId}
                visibility="C"
            />
        </Modal>
    </>
  )
}

export default Students