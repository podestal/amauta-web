import { useState } from "react"
import Button from "../../ui/Button"
import Modal from "../../ui/Modal"
import CreateStudent from "./CreateStudent"
import StudentsAdminTable from "./StudentsAdminTable"
import { motion } from "framer-motion"
import StudentByDNI from "./StudentByDNI"
import StudentByDniInfo from "./StudentByDniInfo"
import AttendanceFilters from "../reports/attendance/AttendanceFilters"
import { Classroom } from "../../../services/api/classroomService"

const StudentsAdmin = () => {

    const [open, setOpen] = useState(false)
    const [selectedClassroom, setSelectedClassroom] = useState('0')
    const [studentUid, setStudentUid] = useState('')
    const [classrooms, setClassrooms] = useState<Classroom[]>([])

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
        <div className="w-full flex justify-between items-center gap-4">
            <h2 className="text-5xl font-bold">Alumnos</h2>
            <div className="w-full mx-40">
                <AttendanceFilters 
                    setSelectedClassroom={setSelectedClassroom}
                    selectedType={''}
                    setSelectedType={() => {}}
                    onlyclassroom={true}
                    setClassrooms={setClassrooms}
                />
            </div>
            <div>
                <Button 
                    label="Nuevo alumno"
                    onClick={() => setOpen(true)}
                />
            </div>
        </div>
        {selectedClassroom === '0' && 
        <>
        <StudentByDNI 
            setStudentUid={setStudentUid}
        />
        {studentUid !== '' && 
            <StudentByDniInfo 
                studentUid={studentUid} 
                classrooms={classrooms}
                classroomId={selectedClassroom}
            />}
        </>
        }
        {selectedClassroom !== '0' && 
        <StudentsAdminTable 
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
            classroomId={selectedClassroom}
        />
    </Modal>
    </>
  )
}

export default StudentsAdmin
