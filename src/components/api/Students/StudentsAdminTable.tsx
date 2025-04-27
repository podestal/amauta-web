import { useRef, useState } from "react"
import useGetStudents from "../../../hooks/api/student/useGetStudents"
import useAuthStore from "../../../hooks/store/useAuthStore"
import Input from "../../ui/Input"
import { motion } from "framer-motion"
import StudentAdminCard from "./StudentAdminCard"
import { Classroom } from "../../../services/api/classroomService"
import moment from "moment"
import Button from "../../ui/Button"
import Modal from "../../ui/Modal"
import { useReactToPrint } from "react-to-print"
import { QRCodeSVG } from "qrcode.react"
import { Student } from "../../../services/api/studentsService"
import getClassroomDescription from "../../../utils/getClassroomDescription"

interface Props {
    classroomId: string
    classrooms: Classroom[]
}

const StudentsAdminTable = ({ classroomId, classrooms }: Props) => {

    const today = moment().date()
    const currentClassroom = classrooms.find(classroom => classroom.id === parseInt(classroomId))
    const classroomDescription = currentClassroom && getClassroomDescription({ lan: 'ES', grade: currentClassroom.grade, section: currentClassroom.section, level: currentClassroom.level })
    
    
    const [open, setOpen] = useState(false)
    const access = useAuthStore(s => s.access) || ''
    const printRef = useRef<HTMLDivElement>(null)
    const handlePrint = useReactToPrint({ 
        contentRef: printRef,
        documentTitle: `QRs`,
        onBeforePrint: () => {
            console.log("Waiting for images to load...");
            return new Promise<void>((resolve) => {
                const images = printRef.current?.querySelectorAll("img");
                let loaded = 0;
                images?.forEach((img) => {
                    if (img.complete) {
                        loaded++;
                    } else {
                        img.onload = () => {
                            loaded++;
                            if (loaded === images.length) resolve();
                        };
                    }
                });
                if (images?.length === 0) resolve();
            });
        },
        onAfterPrint: () => console.log("Impresión completada.")
    })
    const [studentFilter, setStudentFilter] = useState('')
    const {data: students, isLoading, isError, error, isSuccess} = useGetStudents({ access, classroomId, day: today.toString(), month: moment().month().toString() })

    if (isLoading) return <p className="animate-pulse text-2xl text-center py-20">Un Momento ...</p>

    if (isError) return <p>Error {error.message}</p>

    if (isSuccess)

  return (
    <>
    <div className="w-full flex flex-col gap-4">
        <div className="flex gap-4">
            <Input 
                value={studentFilter}
                onChange={e => {
                    setStudentFilter(e.target.value)
                }}
                placeholder="Buscar por nombre"
            />
            <Button 
                label="Imprimir QRs"
                onClick={() => setOpen(true)}
            />
        </div>
        <div className="w-full grid grid-cols-10 text-lg font-bold gap-6 px-6 py-3 dark:bg-gray-900 bg-slate-200 rounded-t-xl">
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
    <Modal isOpen={open} onClose={() => setOpen(false)} whole>
        <div className="flex flex-col gap-4 items-center">
            <Button label="Imprimir" onClick={() => handlePrint()} />
            
            <div ref={printRef} className="my-10">
                {/* Chunk students into groups of 9 */}
                <h2 className="text-3xl my-6 text-center max-lg:hidden">{classroomDescription}</h2>
                {students.reduce((rows, student, index) => {
                    if (index % 9 === 0) rows.push([]);
                    rows[rows.length - 1].push(student);
                    return rows;
                }, [] as Student[][]).map((group, i) => (
                    <div key={i} className="print:break-after-page mx-10">
                        <h2 className="text-3xl my-6 text-center md:hidden">{classroomDescription}</h2>
                        <div className="grid grid-cols-3 gap-8 ">
                            {group.map((student) => (
                                <div className="flex flex-col items-center gap-2 mt-6" key={student.uid}>
                                    <h2 className="lg:text-sm font-semibold text-center mb-2">
                                        {student.first_name} {student.last_name}
                                    </h2>
                                    <QRCodeSVG value={`${student.uid}-${student.first_name}`} size={160} />
                                </div>
                            ))}
                        </div>
                        
                    </div>
                ))}
            </div>
        </div>
    </Modal>
    </>
  )
}

export default StudentsAdminTable