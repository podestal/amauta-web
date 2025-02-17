import { useState } from "react"
import StudentForm from "./forms/StudentForm"
import StudentHealthForm from "./forms/StudentHealthForm"
import StudentBirthForm from "./forms/StudentBirthForm"
import StudentEmergency from "./forms/StudentEmergency"
import { Classroom } from "../../../services/api/classroomService"
import useCreateStudent from "../../../hooks/api/student/useCreateStudent"
import useCreateBirthInfo from "../../../hooks/api/student/studentInfo/useCreateBirthInfo"
import useCreateHealthInfo from "../../../hooks/api/student/studentInfo/useCreateHealthInfo"
import useCreateEmergencyContact from "../../../hooks/api/student/studentInfo/useCreateEmergencyContact"
import StudentTutorForm from "./forms/StudentTutorForm"
import useCreateTutor from "../../../hooks/api/tutor/useCreateTutor"

interface Props {
  classrooms: Classroom[]
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  classroomId: string
}

const CreateStudent = ({ classrooms, setOpen, classroomId }: Props) => {

  const [studentId, setStudentId] = useState('')
  const [page, setPage] = useState(1)
  const createStudent = useCreateStudent({ classroomId })

  // MORE INFO
  const createBirthInfo = useCreateBirthInfo({ classroomId })
  const createHealthInfo = useCreateHealthInfo({ classroomId })
  const createEmergencyContact = useCreateEmergencyContact({  classroomId })
  const createTutor = useCreateTutor()



  return (
    <div className="pt-12">
      <h2 className="text-4xl mb-4 text-center font-bold">Ficha de Inscripción</h2>
      {page === 1 && 
      <StudentForm 
        setPage={setPage}
        classrooms={classrooms}
        setStudentId={setStudentId}
        createStudent={createStudent}
      />}
      {page === 2 &&
      <StudentBirthForm 
        setPage={setPage}
        studentId={studentId}
        createBirthInfo={createBirthInfo}
        classroomId={classroomId}
      />}
      {page === 3 && 
      <StudentHealthForm 
        setPage={setPage}
        studentId={studentId}
        createHealthInfo={createHealthInfo}
        classroomId={classroomId}
      />}

      {page === 4 &&
      <StudentEmergency 
        setPage={setPage}
        studentId={studentId}
        createEmergencyContact={createEmergencyContact}
        classroomId={classroomId}
        setOpen={setOpen}
      />
      }
      {page === 5 &&
      <StudentTutorForm 
        studentId={studentId}
        tutorType="F"
        setPage={setPage}
        createTutor={createTutor}
      />}
      {page === 6 &&
      <StudentTutorForm 
        studentId={studentId}
        tutorType="M"
        setPage={setPage}
        createTutor={createTutor}
      />}
      {page === 7 &&
      <StudentTutorForm 
        studentId={studentId}
        tutorType="O"
        setPage={setPage}
        setOpen={setOpen}
        createTutor={createTutor}
      />}
    </div>
  )
}

export default CreateStudent