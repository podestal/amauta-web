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

interface Props {
  classrooms: Classroom[]
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateStudent = ({ classrooms, setOpen }: Props) => {

  const [studentId, setStudentId] = useState('')
  const [page, setPage] = useState(1)
  const createStudent = useCreateStudent()

  // MORE INFO
  const createBirthInfo = useCreateBirthInfo()
  const createHealthInfo = useCreateHealthInfo()
  const createEmergencyContact = useCreateEmergencyContact()



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
      <StudentHealthForm 
        setPage={setPage}
        studentId={studentId}
        createHealthInfo={createHealthInfo}
      />}
      {page === 3 &&
      <StudentBirthForm 
        setPage={setPage}
        studentId={studentId}
        createBirthInfo={createBirthInfo}
      />}
      {page === 4 &&
      <StudentEmergency 
        setPage={setPage}
        studentId={studentId}
        createEmergencyContact={createEmergencyContact}
        setOpen={setOpen}
      />
      }
    </div>
  )
}

export default CreateStudent