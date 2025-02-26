import { useState } from "react"
import ClassroomSummary from "../components/api/ClassRooms/ClassroomSummary"
import StudentsAdmin from "../components/api/Students/StudentsAdmin"
import { Classroom } from "../services/api/classroomService"
import Tabs from "../components/ui/Tabs"

const StudenAdminPage = () => {

      const [classrooms, setClassrooms] = useState<Classroom[]>([])

  return (
    <div className="w-full max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1380px] mx-auto pt-10">
        <Tabs 
          tabs={[
            {label: 'Alumnos', content: <StudentsAdmin classrooms={classrooms} setClassrooms={setClassrooms} />},
            {label: 'Resumen', content: <ClassroomSummary classrooms={classrooms} />}
          ]}
        />
    </div>
  )
}

export default StudenAdminPage