import { useState } from "react"
import useGetClassroom from "../../../hooks/api/classroom/useGetClassroom"
import useAuthStore from "../../../hooks/store/useAuthStore"
import useLoader from "../../../hooks/ui/useLoader"
import Button from "../../ui/Button"
import Modal from "../../ui/Modal"
import CreateStudent from "./CreateStudent"
import Selector from "../../ui/Selector"
import getClassroomDescription from "../../../utils/getClassroomDescription"
import StudentsAdminTable from "./StudentsAdminTable"
import { motion } from "framer-motion"

const StudentsAdmin = () => {

    const access = useAuthStore(s => s.access) || ''
    const [open, setOpen] = useState(false)
    const [selectedClassroom, setSelectedClassroom] = useState('0')
    const { data: classrooms, isLoading, isError, error, isSuccess } = useGetClassroom({ access })

    useLoader(isLoading)

    if (isError) return <p>Error {error.message}</p>

    if (isSuccess)

  return (
    <>
    <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
            hidden: { opacity: 0, y: -50 }, 
            visible: { opacity: 1, y: 0 }, 
        }}
        transition={{ duration: 0.5 }}
        
        className="pt-10 pb-20 flex flex-col gap-8 justify-center items-center">
        <div className="w-full flex justify-between items-start gap-4">
            <h2 className="text-5xl font-bold">Alumnos</h2>
            <div className="flex gap-4 items-center justify-center">
                <h2 className="text-xl font-bold">Clase</h2>
                <Selector 
                    values={classrooms.map( classroom => ({ id: classroom.id.toString(), name: getClassroomDescription({ lan: 'ES', grade: classroom.grade, section: classroom.section, level: classroom.level }) }))}
                    setter={setSelectedClassroom}
                    lan={'ES'}
                />
            </div>
            <div>
                <Button 
                    label="Nuevo alumno"
                    onClick={() => setOpen(true)}
                />
            </div>
        </div>
        {selectedClassroom !== '0' && <StudentsAdminTable 
            classroomId={selectedClassroom}
            classrooms={classrooms}
        />}
    </motion.div>
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
    </>
  )
}

export default StudentsAdmin
