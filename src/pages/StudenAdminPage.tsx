import ClassroomSummary from "../components/api/ClassRooms/ClassroomSummary"
import StudentsAdmin from "../components/api/Students/StudentsAdmin"
import Tabs from "../components/ui/Tabs"
import useGetClassroom from "../hooks/api/classroom/useGetClassroom"
import useSchoolStore from "../hooks/store/useSchoolStore"
import useAuthStore from "../hooks/store/useAuthStore"
import useLoader from "../hooks/ui/useLoader"

const StudenAdminPage = () => {

      const access =useAuthStore(s => s.access) || ''
      const school = useSchoolStore(s => s.school)
      const { data: classrooms, isLoading, isError, error, isSuccess } = useGetClassroom({ access, school: school.id.toString() })
      
      useLoader(isLoading)

      if (isError) return <p>Error {error.message}</p>
    
      if (isSuccess)

  return (
    <div className="w-full max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1380px] mx-auto pt-10">
        <Tabs 
          tabs={[
            {label: 'Matrículas', content: <StudentsAdmin classrooms={classrooms} />},
            {label: 'Alumnos', content: <ClassroomSummary classrooms={classrooms} />}
          ]}
        />
    </div>
  )
}

export default StudenAdminPage