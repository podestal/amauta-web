import { motion } from "framer-motion"
import useGetStudentsByName from "../../../hooks/api/student/useGetStudentsByName"
import useAuthStore from "../../../hooks/store/useAuthStore"
import useSchoolStore from "../../../hooks/store/useSchoolStore"
import { Student } from "../../../services/api/studentsService"

interface Props {
    name: string
    selectedStudents: Student[]
    setSelectedStudents: React.Dispatch<React.SetStateAction<Student[]>>
    color: string
}

const StudentSelector = ({ name, setSelectedStudents, selectedStudents, color }: Props) => {

    const toggleStudent = (student: Student) => {
        setSelectedStudents((prev) => {
            const exists = prev.some((s) => s.uid === student.uid);
            return exists ? prev.filter((s) => s.uid !== student.uid) : [...prev, student];
        });
    };

    const access = useAuthStore(s => s.access) || ''
    const school = useSchoolStore(s => s.school).id.toString()

    const { data: students, isLoading, isError, error, isSuccess } = useGetStudentsByName({ access, name, school })

    if (isLoading) return <p className="animate-pulse text-2xl text-center py-20">Un Momento ...</p>

    if (isError) return <p>Error {error.message}</p>

    if (isSuccess)

  return (
    <div>
        <h2 className="font-bold">Alumnos</h2>
        {students
            .map((student) => (
                <motion.button
                    key={student.uid}
                    type="button"
                    onClick={() => toggleStudent(student)}
                    className={`px-3 py-1 text-sm rounded-full transition-all duration-300 m-2 ${
                        !selectedStudents.some(student => student.uid === student.uid)
                            ? `${color} text-white`
                            : "bg-gray-700 text-gray-300 hover:" + color.replace("bg-", "hover:bg-") + " hover:text-white"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                >
                    {student.first_name} {student.last_name}
                </motion.button>
            ))}
    </div>
  )
}

export default StudentSelector