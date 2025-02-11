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
import Tabs from "../../ui/Tabs"
import StudentAdminCard from "./StudentAdminCard"
import Modal from "../../ui/Modal"
import Button from "../../ui/Button"
import CreateStudent from "./CreateStudent"
import useGetClassroom from "../../../hooks/api/classroom/useGetClassroom"

interface Props {
    classroom?: string
    level?: string
}

const Students = ({ classroom, level }: Props) => {

    const today = moment().date()
    const [open, setOpen] = useState(false)
    const [filter, setFilter] = useState('')
    const access = useAuthStore(s => s.access) || ''
    const classroomId = classroom ? classroom : useLocation().state?.classroom
    const currentLevel = useLocation().state?.level || level
    const group = useGetProfileStore(s => s.user?.groups[0])
    const profile = useGetProfileStore(s => s.profile)
    const instructor = group === 'instructor' && profile as Instructor
    const canModifyAttendance = instructor && currentLevel === 'P'

    const { data: classrooms, isLoading: classroomLoading, isError: isErrorClassroom, error: classroomError, isSuccess: classroomSuccess } = useGetClassroom({ access })
    const {data: students, isLoading, isError, error, isSuccess} = useGetStudents({ access, classroomId, day: today.toString() })

    if (isLoading || classroomLoading) return <p className="animate-pulse text-center text-2xl pt-20">Un momento ...</p>

    if (isError || isErrorClassroom) return <p>Error {error ? error.message : classroomError?.message}</p>

    if (isSuccess && classroomSuccess)

  return (
    <>
    <div className="pt-14 max-lg:hidden">
        <Tabs
            tabs={[
            {
                label: 'Asistencia',
                content: 
                <div className="pt-10 pb-20">
                    <h2 className="text-5xl font-bold text-center">Alumnos</h2>
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
                </div>,
            },
            {
                label: 'Informes',
                content: 
                <>
                <div className="pt-10 pb-20">
                    <div className="w-full flex justify-between items-start gap-4">
                        <h2 className="text-5xl font-bold">Alumnos</h2>
                        <div>
                            <Button 
                                label="Nuevo alumno"
                                onClick={() => setOpen(true)}
                            />
                        </div>
                    </div>
                    <StudentFilter 
                        filter={filter}
                        setFilter={setFilter}
                    />
                    <div className="w-full grid grid-cols-10 text-lg font-bold gap-6 px-6 py-3 bg-gray-900 rounded-t-xl mb-6">
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
                        className="w-full flex flex-col gap-4">
                        {students
                            .filter( student => `${student.first_name.toLowerCase()}${student.last_name.toLowerCase()}`.includes(filter.toLowerCase()))
                            .map( student => (
                            <StudentAdminCard 
                                key={student.uid}
                                student={student}
                                classrooms={classrooms}
                            />
                        ))}
                    </motion.div>
                </div>
                <Modal 
                    isOpen={open}
                    onClose={() => setOpen(false)}
                    whole
                >
                    <CreateStudent 
                        classrooms={classrooms}
                        setOpen={setOpen}
                    />
                </Modal>
                </>,
            },
            ]}
        />
    </div>
    <div className="pt-10 pb-20 lg:hidden">
        <h2 className="text-5xl font-bold text-center">Alumnos</h2>
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
    </>
  )
}

export default Students