import { useState } from "react"
import StudentForm from "./forms/StudentForm"
import StudentHealthForm from "./forms/StudentHealthForm"
import StudentBirthForm from "./forms/StudentBirthForm"
import StudentEmergency from "./forms/StudentEmergency"
import moment from "moment"
import { Classroom } from "../../../services/api/classroomService"

interface Props {
  classrooms: Classroom[]
}

const CreateStudent = ({ classrooms }: Props) => {

  const [studentId, setStudentId] = useState('')

  console.log(moment('1991-03-29').format('YYYY-MM-DD'),);
  
  const [page, setPage] = useState(1)



  return (
    <div className="pt-12">
      <h2 className="text-4xl mb-4 text-center font-bold">Ficha de Inscripción</h2>
      {page === 1 && 
      <StudentForm 
        setPage={setPage}
        classrooms={classrooms}
        setStudentId={setStudentId}
      />}
      {page === 2 && 
      <StudentHealthForm 
        setPage={setPage}
        studentId={studentId}
      />}
      {page === 3 &&
      <StudentBirthForm 
        setPage={setPage}
        studentId={studentId}
      />}
      {page === 4 &&
      <StudentEmergency 
        setPage={setPage}
        studentId={studentId}
      />
      }
    </div>
  )
}

export default CreateStudent