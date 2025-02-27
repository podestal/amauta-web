import { useEffect, useState } from "react"
import Button from "../../ui/Button"
import Modal from "../../ui/Modal"
import CreateStudent from "./CreateStudent"
import StudentsAdminTable from "./StudentsAdminTable"
import { motion } from "framer-motion"
import StudentByDNI from "./StudentByDNI"
import StudentByDniInfo from "./StudentByDniInfo"
import { Classroom } from "../../../services/api/classroomService"
import useSchoolStore from "../../../hooks/store/useSchoolStore"
import StudentsByNameInfo from "./StudentsByNameInfo"
import StudentAdminTableLastTen from "./StudentAdminTableLastTen"

interface Props {
    classrooms: Classroom[]
}

const StudentsAdmin = ({ classrooms }: Props) => {

    const [open, setOpen] = useState(false)
    const [studentUid, setStudentUid] = useState('')
    const [studentName, setStudentName] = useState('')
    const school = useSchoolStore(s => s.school).id

    // useEffect(() => {
    //     if (selectedClassroom !== '0') {
    //         setStudentUid('')
    //         setStudentName('')
    //     }
    // }, [selectedClassroom, setSelectedClassroom])

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
            <div>
                <Button 
                    label="Nuevo alumno"
                    onClick={() => setOpen(true)}
                />
            </div>
        </div>
        <StudentByDNI 
            setStudentUid={setStudentUid}
            setStudentName={setStudentName}
            studentUid={studentUid}
            studentName={studentName}
        />
        {studentUid && 
            <StudentByDniInfo 
                studentUid={studentUid} 
                classrooms={classrooms}
                classroomId={'1'}
            />}
        {studentName && 
            <StudentsByNameInfo 
                name={studentName}
                school={school}
                classrooms={classrooms}
                classroomId={'1'}
            />
        }
        {!studentName && !studentUid &&
            <StudentAdminTableLastTen 
                school={school}
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
            classroomId={'1'}
        />
    </Modal>
    </>
  )
}

export default StudentsAdmin
