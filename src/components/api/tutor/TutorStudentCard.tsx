import { motion } from "framer-motion";
import useLanguageStore from "../../../hooks/store/useLanguageStore";
import { Student } from "../../../services/api/studentsService"
import { getAttendanceStatusCount } from "../../../utils/getAttendanceStatusCount";
import getClassroomDescription from "../../../utils/getClassroomDescription";
import Button from "../../ui/Button";
import { RiArrowUpDoubleFill } from "@remixicon/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    student: Student
}

const TutorStudentCard = ({ student }: Props) => {

    const lan = useLanguageStore(s => s.lan)
    const { grade, section, level } = student.clase && student.clase
    const classroomDescription = getClassroomDescription({lan, grade, section, level})
    const {onTime, excused, leftEarly, notAttended, late} = getAttendanceStatusCount(student.attendances)
    const navigate = useNavigate()

    const [show, setShow] = useState(false)
    const toggleAnnouncement = () => setShow(!show)
    
  return (
    <div className="border-b py-4 border-gray-400">
        <div className="flex flex-col gap-2 mb-10">
            <div className="w-full flex justify-between items-center">
                <h2 className="text-3xl">{student.first_name} {student.last_name}</h2>
                <motion.div
                    className="cursor-pointer dark:hover:text-neutral-400 hover:text-slate-800 "
                    onClick={toggleAnnouncement}
                    animate={{ rotate: show ? 180 : 0 }} // Smooth rotation
                    transition={{ duration: 0.3 }}
                >
                <RiArrowUpDoubleFill />
                </motion.div>
            </div>
            <p className="dark:text-slate-300">{classroomDescription}</p>
        </div>
        {show && 
        <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
            height: show ? "auto" : 0,
            opacity: show ? 1 : 0,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <div className="mb-6 w-[70%] flex flex-col gap-4 mx-auto">
                <div className="flex justify-between">
                    <p>{lan === 'EN' ? 'On Time' : 'Temprano'}</p>
                    <p className="font-bold text-green-500">{onTime}</p>
                </div>
                <div className="flex justify-between ">
                    <p>{lan === 'EN' ? 'Left Early' : 'Salió Temprano'}</p>
                    <p className="font-bold text-yellow-500">{leftEarly}</p>
                </div>
                <div className="flex justify-between ">
                    <p>{lan === 'EN' ? 'Not Attended' : 'Falta'}</p>
                    <p className="font-bold text-red-500">{notAttended}</p>
                </div>
                <div className="flex justify-between ">
                    <p>{lan === 'EN' ? 'Late' : 'Tardanza'}</p>
                    <p className="font-bold text-amber-500">{late}</p>
                </div>
                <div className="flex justify-between ">
                    <p>{lan === 'EN' ? 'Excused' : 'Excusado'}</p>
                    <p className="font-bold text-green-500">{excused}</p>
                </div>
                <div className="mt-6">
                    <Button 
                        onClick={()=>{navigate(`/attendance/${student.uid}`)}}
                        label={lan === 'EN' ? 'View Details' : 'Ver Detalles'}
                    />
                </div>
            </div>
 
        </motion.div>}
    </div>
  )
}

export default TutorStudentCard