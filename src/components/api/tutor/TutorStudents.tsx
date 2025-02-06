import useGetStudents from "../../../hooks/api/student/useGetStudents"
import useAuthStore from "../../../hooks/store/useAuthStore"
import useLoader from "../../../hooks/ui/useLoader"
import TutorStudentCard from "./TutorStudentCard"


const TutorStudents = () => {

    const access = useAuthStore(s => s.access) || ''
    const {data: students, isLoading, isError, error, isSuccess} = useGetStudents({ access, tutor:true })

    useLoader(isLoading)

    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess) 
  return (
    <div>
        <h2 className="text-4xl font-poppins font-bold mb-10 text-center">Alumnos</h2>
        {students?.map(student => (
            <TutorStudentCard 
                key={student.uid}
                student={student}
            />
        ))}
    </div>
  )
}

export default TutorStudents