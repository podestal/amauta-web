import { useLocation, useParams } from "react-router-dom"
import StudentsAdminTable from "../components/api/Students/StudentsAdminTable"


const StudentsAdminByClassroom = () => {

    const params = useParams()
    const classroomId = params.classroomId || ''
    const location = useLocation()
    const classrooms = location.state.classrooms || []
    console.log('classrooms',classrooms);
    

  return (
    <div className="w-full max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1380px] mx-auto pt-10">
        <StudentsAdminTable 
            classroomId={classroomId}
            classrooms={classrooms}
        />
    </div>
  )
}

export default StudentsAdminByClassroom