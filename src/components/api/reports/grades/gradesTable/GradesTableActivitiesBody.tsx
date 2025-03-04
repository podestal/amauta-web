import { motion } from "framer-motion"
import useGetStudentsByGrade from "../../../../../hooks/api/student/useGetStudentsByGrades"
import useAuthStore from "../../../../../hooks/store/useAuthStore"
import GradesTableGradeCell from "./GradesTableGradeCell"
import AverageSelector from "../AverageSelector"
import { useState } from "react"

interface Props {
    classroomId: string
    competence: string
    selectedAssignature: string
}

const GradesTableActivitiesBody = ({ classroomId, competence, selectedAssignature }: Props) => {

    const [gradeChanged, setGradeChanged] = useState(false)
    // console.log('gradeChanged', gradeChanged)
    
    const access = useAuthStore(s => s.access) || ''
    const { data: students, isLoading, isError, error, isSuccess } = useGetStudentsByGrade({ access, classroomId, competence })

    if (isLoading) return <p className="animate-pulse text-center my-8 text-xl">Cargando...</p>

    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess)

  return (
    <div className="w-full">
        {/* <>{console.log('students', students)}</> */}
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
                    <AverageSelector 
                        student={student}
                        selectedCompetency={competence}
                        handleAverageChange={() => {}} 
                        // currentGrade={student.competencyGrades[parseInt(selectedComeptency)]}
                        selectedAssignature={selectedAssignature}
                        selectedCategory={'1'}
                        selectedComeptency={competence}
                        grades={student.filtered_grades}
                        gradeChanged={gradeChanged}
                    />
                    {student.filtered_grades
                    .sort((a, b) => a.activity - b.activity)
                    .map(grade => (
                        <GradesTableGradeCell 
                            key={grade.id}
                            grade={grade}
                            classroomId={classroomId}
                            competence={competence}
                            setGradeChanged={setGradeChanged}
                        />
                    ))}
                </motion.div>
        ))}
    </div>
  )
}

export default GradesTableActivitiesBody