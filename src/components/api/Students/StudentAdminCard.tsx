import { useState } from "react"
import { Student } from "../../../services/api/studentsService"
import Modal from "../../ui/Modal"
import StudentInfo from "./StudentInfo"
import { RiBookletFill, RiHistoryFill } from "@remixicon/react"
import { AlertTriangle } from "lucide-react";
import StudentEmergency from "./forms/StudentEmergency"
import StudentBirthForm from "./forms/StudentBirthForm"
import StudentHealthForm from "./forms/StudentHealthForm"
import StudentForm from "./forms/StudentForm"
import { Classroom } from "../../../services/api/classroomService"
import useUpdateStudent from "../../../hooks/api/student/useUpdateStudent"
import StudentTutorForm from "./forms/StudentTutorForm"
import { motion } from "framer-motion"
import useGetProfileStore from "../../../hooks/store/useGetProfileStore"
import AttendanceCalendar, { AttendanceStatus } from "../reports/attendance/studentAdmin/AttendanceCalendar"

export const aprilAttendanceMock: DailyAttendance[] = [
    { date: "2025-04-01", entry: "onTime", exit: "onTime" },
    { date: "2025-04-02", entry: "late", exit: "onTime" },
    { date: "2025-04-03", entry: "onTime", exit: "excused" },
    { date: "2025-04-04", entry: "noShow", exit: "noShow" },
    { date: "2025-04-05", entry: "onTime", exit: "onTime" },
    { date: "2025-04-06", entry: "absent", exit: "absent" },
    { date: "2025-04-07", entry: "onTime", exit: "late" },
    { date: "2025-04-08", entry: "late", exit: "late" },
    { date: "2025-04-09", entry: "onTime", exit: "onTime" },
    { date: "2025-04-10", entry: "onTime", exit: "excused" },
    { date: "2025-04-11", entry: "onTime", exit: "onTime" },
    { date: "2025-04-12", entry: "late", exit: "onTime" },
    { date: "2025-04-13", entry: "noShow", exit: "noShow" },
    { date: "2025-04-14", entry: "onTime", exit: "late" },
    { date: "2025-04-15", entry: "excused", exit: "excused" },
    { date: "2025-04-16", entry: "onTime", exit: "onTime" },
    { date: "2025-04-17", entry: "onTime", exit: "late" },
    { date: "2025-04-18", entry: "absent", exit: "absent" },
    { date: "2025-04-19", entry: "late", exit: "onTime" },
    { date: "2025-04-20", entry: "onTime", exit: "onTime" },
    { date: "2025-04-21", entry: "late", exit: "late" },
    { date: "2025-04-22", entry: "onTime", exit: "onTime" },
    { date: "2025-04-23", entry: "onTime", exit: "excused" },
    { date: "2025-04-24", entry: "onTime", exit: "onTime" },
    { date: "2025-04-25", entry: "onTime", exit: "onTime" },
    { date: "2025-04-26", entry: "absent", exit: "absent" },
    { date: "2025-04-27", entry: "excused", exit: "excused" },
    { date: "2025-04-28", entry: "late", exit: "onTime" },
    { date: "2025-04-29", entry: "onTime", exit: "onTime" },
    { date: "2025-04-30", entry: "onTime", exit: "late" },
  ];

interface DailyAttendance {
  date: string; // e.g. "2025-04-01"
  entry: AttendanceStatus;
  exit: AttendanceStatus;
}

interface Props {
    student: Student
    classrooms: Classroom[]
    classroomId: string
    studentDni?: string
    studentName?: string
    showIcons?: boolean
}

const StudentAdminCard = ({ student, classrooms, classroomId, studentDni, studentName, showIcons=false }: Props) => {

  const itemVariants = {
    hidden: { opacity: 0, x: 50 }, 
    visible: { opacity: 1, x: 0 }, 
  }

  const [open, setOpen] = useState(false)
  const [renderComponent, setRenderComponent] = useState('')

  const group = useGetProfileStore(s => s.user)?.groups[0]

  const birthInfo = student.birth_info ? student.birth_info : undefined
  const healthInfo = student.health_info ? student.health_info : undefined
  const emergencyContact = student.emergency_contact ? student.emergency_contact : undefined
  const studentFather = student.tutors.find(tutor => tutor.tutor_type === 'F')
  const studentMother = student.tutors.find(tutor => tutor.tutor_type === 'M')
  const studentTutor = student.tutors.find(tutor => tutor.tutor_type === 'O')

  const [isExpanded, setIsExpanded] = useState(false)

  // MUTATIONS
  const updateStudent = useUpdateStudent({ studentId: student.uid, classroomId, studentDni, studentName })

  return (
    <>
        <motion.div 
            variants={itemVariants}
            className={`w-full z-20 lg:grid lg:grid-cols-10 flex-col gap-6 max-lg:mb-4 items-center hover:bg-slate-100 dark:hover:bg-slate-700 ${!student.is_active ? 'dark:bg-slate-950 bg-slate-100' : 'dark:bg-slate-900 bg-slate-200'} py-4 px-6 rounded-xl shadow-md transition-all md:flex md:flex-col`}
        >  
            {/* Header Section */}
            <div className="col-span-3 flex items-center gap-4 w-full">
                <RiHistoryFill 
                    className="text-green-600 hover:text-green-800 cursor-pointer text-2xl max-lg:hidden"
                    onClick={() =>{
                        setRenderComponent('studentCalendar');
                        setOpen(true);
                    }}
                />
                <RiBookletFill 
                    className="text-blue-700 hover:text-blue-800 cursor-pointer text-2xl"
                    onClick={() =>{
                        setRenderComponent('studentInfo')
                        setOpen(true);
                        
                    }}
                />
                <div className="flex items-center gap-2">
                    {!student.dni && (
                        <AlertTriangle className="text-red-500 w-5 h-5" />
                    )}
                    <p className={`font-medium text-sm lg:text-lg ${!student.is_active && 'line-through text-slate-400'}`}>
                        {student.first_name} {student.last_name}
                    </p>
                </div>
                {/* Toggle Button for Mobile */}
                {group === 'manager' && 
                <button 
                    className="md:hidden ml-auto bg-gray-700 px-3 py-1 rounded-lg text-white text-sm"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? "Ocultar Info" : "Mostrar Info"}
                </button>}
            </div>

            {/* Information Blocks */}
            {<div className={`w-full lg:col-span-7 gap-4 ${isExpanded ? 'flex flex-col mt-6' : 'lg:grid lg:grid-cols-7 hidden'}`}>
                <StudentInfoBlock 
                    onClick={() => {
                        setRenderComponent('studentForm');
                        setOpen(true);
                    }}
                    filled={true}
                    label="Información Personal"
                />
                <StudentInfoBlock 
                    onClick={() => {
                        setRenderComponent('birthInfo');
                        setOpen(true);
                    }}
                    filled={!!student.birth_info}
                    label="Información Nacimiento"
                />
                <StudentInfoBlock 
                    onClick={() => {
                        setRenderComponent('healthInfo');
                        setOpen(true);
                    }}
                    filled={!!student.health_info}
                    label="Información Salud"
                />
                <StudentInfoBlock 
                    onClick={() => {
                        setRenderComponent('emergencyContact');
                        setOpen(true);
                    }}
                    filled={!!student.emergency_contact}
                    label="Contacto Emergencia"
                />
                <StudentInfoBlock 
                    onClick={() => {
                        setRenderComponent('studentFatherForm');
                        setOpen(true);
                    }}
                    filled={!!studentFather}
                    label="Información Padre"
                />
                <StudentInfoBlock 
                    onClick={() => {
                        setRenderComponent('studentMotherForm');
                        setOpen(true);
                    }}
                    filled={!!studentMother}
                    label="Información Madre"
                />
                <StudentInfoBlock 
                    onClick={() => {
                        setRenderComponent('studentTutorForm');
                        setOpen(true);
                    }}
                    filled={!!studentTutor}
                    label="Información Apoderado"
                />
            </div>}
        </motion.div>

    <Modal 
      isOpen={open}
      onClose={() => setOpen(false)}
      whole
    >
      {renderComponent === 'studentCalendar' && 
      <AttendanceCalendar 
        student={student}
      />}
      {renderComponent === 'studentInfo' && 
      <StudentInfo 
        student={student}
        showIcons={showIcons}
        picture={true}
      />}
      {renderComponent === 'birthInfo' && 
      <StudentBirthForm 
        studentId={student.uid}
        setPage={() => {}}
        nextPrev={false}
        birthInfo={birthInfo}
        setOpen={setOpen}
        classroomId={classroomId}
        studentDni={studentDni}
        studentName={studentName}
      />}
      {renderComponent === 'healthInfo' &&
      <StudentHealthForm 
        studentId={student.uid}
        setPage={() => {}}
        nextPrev={false}
        healthInfo={healthInfo}
        setOpen={setOpen}
        classroomId={classroomId}
        studentDni={studentDni}
        studentName={studentName}
      />}
      {renderComponent === 'emergencyContact' &&
      <StudentEmergency 
        studentId={student.uid}
        setPage={() => {}}
        nextPrev={false}
        emergencyContact={emergencyContact}
        setOpen={setOpen}
        classroomId={classroomId}
        studentDni={studentDni}
        studentName={studentName}
      />}
      {renderComponent === 'studentForm' &&
      <StudentForm
        classrooms={classrooms}
        setStudentId={() => {}}
        setPage={() => {}}
        student={student}
        updateStudent={updateStudent}
        setOpen={setOpen}
      />}
      {renderComponent === 'studentFatherForm' &&
      <StudentTutorForm 
        studentId={student.uid}
        setPage={() => {}}
        tutorType="F"
        tutor={studentFather}
        setOpen={setOpen}
        classroomId={classroomId}
        studentDni={studentDni}
        studentName={studentName}
      />}
      {renderComponent === 'studentMotherForm' &&
      <StudentTutorForm
        studentId={student.uid}
        setPage={() => {}}
        tutorType="M"
        tutor={studentMother}
        setOpen={setOpen}
        classroomId={classroomId}
        studentDni={studentDni}
        studentName={studentName}
      />}
      {renderComponent === 'studentTutorForm' &&
      <StudentTutorForm
        studentId={student.uid}
        setPage={() => {}}
        tutorType="O"
        tutor={studentTutor}
        setOpen={setOpen}
        classroomId={classroomId}
        studentDni={studentDni}
        studentName={studentName}
      />}
    </Modal>
    </>
  )
}

interface StudentInfoBlockProps {
    onClick: () => void
    filled: boolean
    label?: string
}

const StudentInfoBlock = ({ onClick, filled, label }: StudentInfoBlockProps ) => {
  return (
      <div 
          onClick={onClick}
          className={`relative w-full h-6 rounded-full cursor-pointer transition-all duration-300 shadow-sm 
              ${filled ? 'bg-green-600 hover:bg-green-700' : 'dark:bg-neutral-400 bg-neutral-200 dark:hover:bg-neutral-500 hover:bg-neutral-300'}
          `}
      >
          <p className=" mx-6 font-bold lg:hidden">{label}</p>
          {/* <span className="absolute top-[-1.5rem] text-sm text-center w-full text-gray-600 dark:text-gray-300">{label}</span> */}
      </div>
  );
};

export default StudentAdminCard