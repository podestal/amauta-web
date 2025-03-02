import { motion } from "framer-motion"
import useGetStudents from "../../../hooks/api/student/useGetStudents"
import useAuthStore from "../../../hooks/store/useAuthStore"
import useLoader from "../../../hooks/ui/useLoader"
import TutorStudentCard from "./TutorStudentCard"
import useGetProfileStore from "../../../hooks/store/useGetProfileStore"


const TutorStudents = () => {

    const access = useAuthStore(s => s.access) || ''
    const profile = useGetProfileStore(s => s.profile)
    console.log('profile', profile)
    
    const {data: students, isLoading, isError, error, isSuccess} = useGetStudents({ access, tutor:true })

    useLoader(isLoading)

    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess) 
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="pb-20"
    >
        <h2 className="text-4xl font-poppins font-bold mb-10 text-center">{students.length > 1 ? 'Alumnos' : 'Alumno'}</h2>
        {students?.map(student => (
            <TutorStudentCard 
                key={student.uid}
                student={student}
            />
        ))}
    </motion.div>
  )
}

export default TutorStudents