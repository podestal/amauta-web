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

interface Props {
    student: Student
    classrooms: Classroom[]
}

const StudentAdminCard = ({ student, classrooms }: Props) => {

  const [open, setOpen] = useState(false)
  const [renderComponent, setRenderComponent] = useState('')

  return (
    <>
    <div 
      // onClick={() => setOpen(true)}
      className="w-full grid grid-cols-7 gap-6 hover:bg-slate-200 dark:hover:bg-slate-900  py-4 rounded-xl">  
        <div className="col-span-3 flex items-center justify-start gap-4">
          <RiBookletFill 
            className="text-blue-700 hover:text-blue-800 cursor-pointer"
            onClick={() =>{
                setRenderComponent('studentInfo')
               setOpen(true)}}
          />
          <p className="">{student.first_name} {student.last_name}</p>
        </div>
        <div 
            className="dark:bg-neutral-400 bg-neutral-200 dark:hover:bg-neutral-500 hover:bg-neutral-300 cursor-pointer"
            onClick={() => {
              setRenderComponent('studentForm')
              setOpen(true)
            }}
        />
        <div 
          onClick={() => {
            setRenderComponent('birthInfo')
            !student.birth_info && setOpen(true)
          }}
          className={`w-[40%] h-4 ${student.birth_info ? 'bg-green-600' : 'dark:bg-neutral-400 bg-neutral-200 dark:hover:bg-neutral-500 hover:bg-neutral-300 cursor-pointer'}`}/>
        <div 
          onClick={() => {
            setRenderComponent('healthInfo')
            !student.health_info && setOpen(true)
          }}
          className={`w-[40%] h-4 ${student.health_info ? 'bg-green-600' : 'dark:bg-neutral-400 bg-neutral-200 dark:hover:bg-neutral-500 hover:bg-neutral-300 cursor-pointer'}`}/>
        <div 
          onClick={() => {
            setRenderComponent('emergencyContact')
            !student.emergency_contact && setOpen(true)
          }}
          className={`w-[40%] h-4 ${student.emergency_contact ? 'bg-green-600' : 'dark:bg-neutral-400 bg-neutral-200 dark:hover:bg-neutral-500 hover:bg-neutral-300 cursor-pointer'}`}/>
    </div>
    <Modal 
      isOpen={open}
      onClose={() => setOpen(false)}
      whole
    >
      {renderComponent === 'studentInfo' && 
      <StudentInfo 
        student={student}
      />}
      {renderComponent === 'birthInfo' && 
      <StudentBirthForm 
        studentId={student.uid}
        setPage={() => {}}
        nextPrev={false}
      />}
      {renderComponent === 'healthInfo' &&
      <StudentHealthForm 
        studentId={student.uid}
        setPage={() => {}}
        nextPrev={false}
      />}
      {renderComponent === 'emergencyContact' &&
      <StudentEmergency 
        studentId={student.uid}
        setPage={() => {}}
      />}
      {renderComponent === 'studentForm' &&
      <StudentForm
        classrooms={classrooms}
        setStudentId={() => {}}
        setPage={() => {}}
        student={student}
      />}
    </Modal>
    </>
  )
}

export default StudentAdminCard