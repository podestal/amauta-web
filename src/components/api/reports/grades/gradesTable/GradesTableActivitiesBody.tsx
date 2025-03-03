import { motion } from "framer-motion"
import useGetStudentsByGrade from "../../../../../hooks/api/student/useGetStudentsByGrades"
import useAuthStore from "../../../../../hooks/store/useAuthStore"

interface Props {
    classroomId: string
    competence: string
}

const gradeOptions = ["A", "B", "C", "AD", "NA"]

const gradeStyles: Record<string, string> = {
    "A": "bg-blue-500 text-white",
    "B": "bg-yellow-500 text-white",
    "C": "bg-red-500 text-white",
    "AD": "bg-green-500 text-white",
    "NA": "bg-gray-300 text-gray-700", 
  };

const GradesTableActivitiesBody = ({ classroomId, competence }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const { data: students, isLoading, isError, error, isSuccess } = useGetStudentsByGrade({ access, classroomId, competence })

    if (isLoading) return <p className="animate-pulse text-center my-8 text-xl">Cargando...</p>

    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess)

  return (
    <div className="w-full">
        <>{console.log('students', students)}</>
        {students.map( (student, index) => (
                    <motion.div
                    key={student.uid}
                    className="w-full flex border-b border-gray-700 hover:bg-gray-800 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                    <h2 className="min-w-[200px] max-w-[200px] py-3 px-4">
                        {student.uid}
                    </h2>
                    <h2 className="min-w-[360px] max-w-[360px] py-3 px-4">
                        {student.first_name} {student.last_name}
                    </h2>
                    {student.filtered_grades
                    .sort((a, b) => a.activity - b.activity)
                    .map(grade => (
                        <div 
                            key={grade.id} 
                            className="min-w-[160px] max-w-[160px] text-center p-[1px]"
                        >
                            <select
                            className={` w-full h-full text-center font-semibold cursor-pointer outline-none transition-all duration-300 ${gradeStyles[grade.calification]}`}
                            value={grade.calification}
                            // onChange={(e) => handleGradeChange(student.id, assignment.id, e.target.value)}
                            onChange={(e) => console.log(e)}
                            >
                            {gradeOptions.map((grade) => (
                                <option key={grade} value={grade}>
                                {grade}
                                </option>
                            ))}
                            </select>
                        </div>
                    ))}
                </motion.div>
        ))}
    </div>
  )
}

export default GradesTableActivitiesBody