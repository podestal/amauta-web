import { useState } from "react"
import { Student } from "../../../services/api/studentsService"
import Modal from "../../ui/Modal"
import StudentInfo from "./StudentInfo"
import { RiBookletFill } from "@remixicon/react"

import StudentEmergency from "./forms/StudentEmergency"
import StudentBirthForm from "./forms/StudentBirthForm"
import StudentHealthForm from "./forms/StudentHealthForm"
import StudentForm from "./forms/StudentForm"
import { Classroom } from "../../../services/api/classroomService"
import useUpdateStudent from "../../../hooks/api/student/useUpdateStudent"
import StudentTutorForm from "./forms/StudentTutorForm"
import { motion } from "framer-motion"

interface Props {
    student: Student
    classrooms: Classroom[]
    classroomId: string
    studentDni?: string
    studentName?: string
}

const StudentAdminCard = ({ student, classrooms, classroomId, studentDni, studentName }: Props) => {

  const itemVariants = {
    hidden: { opacity: 0, x: 50 }, 
    visible: { opacity: 1, x: 0 }, 
  }

  const [open, setOpen] = useState(false)
  const [renderComponent, setRenderComponent] = useState('')

  const birthInfo = student.birth_info ? student.birth_info : undefined
  const healthInfo = student.health_info ? student.health_info : undefined
  const emergencyContact = student.emergency_contact ? student.emergency_contact : undefined
  const studentFather = student.tutors.find(tutor => tutor.tutor_type === 'F')
  const studentMother = student.tutors.find(tutor => tutor.tutor_type === 'M')
  const studentTutor = student.tutors.find(tutor => tutor.tutor_type === 'O')

  // MUTATIONS
  const updateStudent = useUpdateStudent({ studentId: student.uid, classroomId, studentDni, studentName })

  return (
    <>
        <motion.div 
            variants={itemVariants}
            className="w-full grid grid-cols-10 gap-6 items-center bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-700 py-4 px-6 rounded-xl shadow-md transition-all"
        >  
            {/* Student Name & Icon */}
            <div className="col-span-3 flex items-center gap-4">
                <RiBookletFill 
                    className="text-blue-700 hover:text-blue-800 cursor-pointer text-2xl"
                    onClick={() =>{
                        setRenderComponent('studentInfo')
                        setOpen(true)
                    }}
                />
                <p className="font-medium text-lg">{student.first_name} {student.last_name}</p>
            </div>

            {/* Information Progress Indicators */}
            <StudentInfoBlock 
                onClick={() => {
                    setRenderComponent('studentForm');
                    setOpen(true);
                }}
                filled={true} // Always filled
            />
            <StudentInfoBlock 
                onClick={() => {
                    setRenderComponent('birthInfo');
                    setOpen(true);
                }}
                filled={!!student.birth_info}
            />
            <StudentInfoBlock 
                onClick={() => {
                    setRenderComponent('healthInfo');
                    setOpen(true);
                }}
                filled={!!student.health_info}
            />
            <StudentInfoBlock 
                onClick={() => {
                    setRenderComponent('emergencyContact');
                    setOpen(true);
                }}
                filled={!!student.emergency_contact}
            />
            <StudentInfoBlock 
                onClick={() => {
                    setRenderComponent('studentFatherForm');
                    setOpen(true);
                }}
                filled={!!studentFather}
            />
            <StudentInfoBlock 
                onClick={() => {
                    setRenderComponent('studentMotherForm');
                    setOpen(true);
                }}
                filled={!!studentMother}
            />
            <StudentInfoBlock 
                onClick={() => {
                    setRenderComponent('studentTutorForm');
                    setOpen(true);
                }}
                filled={!!studentTutor}
            />
        </motion.div>
    <Modal 
      isOpen={open}
      onClose={() => setOpen(false)}
      whole
    >
      {renderComponent === 'studentInfo' && 
      <StudentInfo 
        student={student}
        showIcons={false}
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
}

const StudentInfoBlock = ({ onClick, filled }: StudentInfoBlockProps ) => {
  return (
      <div 
          onClick={onClick}
          className={`relative w-full h-6 rounded-full cursor-pointer transition-all duration-300 shadow-sm 
              ${filled ? 'bg-green-600 hover:bg-green-700' : 'dark:bg-neutral-400 bg-neutral-200 dark:hover:bg-neutral-500 hover:bg-neutral-300'}
          `}
      >
          {/* <span className="absolute top-[-1.5rem] text-sm text-center w-full text-gray-600 dark:text-gray-300">{label}</span> */}
      </div>
  );
};

export default StudentAdminCard