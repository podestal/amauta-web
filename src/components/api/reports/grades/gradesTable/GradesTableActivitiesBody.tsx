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
    quarter: string
    category: string
    filterByName: string
    byAssignature?: boolean
}

const GradesTableActivitiesBody = ({ classroomId, competence, selectedAssignature, quarter, category, filterByName, byAssignature }: Props) => {

    const [gradeChanged, setGradeChanged] = useState(false)
    
    const access = useAuthStore(s => s.access) || ''
    const { data: students, isLoading, isError, error, isSuccess } = useGetStudentsByGrade({ access, classroomId, competence, quarter})

    if (isLoading) return <p className="animate-pulse text-center my-8 text-xl">Cargando...</p>

    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess)

  return (
    <div className="w-full">
        {students
        .filter(student => student.first_name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(filterByName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) || student.last_name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(filterByName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")))
        .map( (student, index) => (
                    <motion.div
                    key={student.uid}
                    className="w-full flex border-b border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-300 transition-colors"
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
                    {category === '0' && <AverageSelector 
                        student={student}
                        selectedAssignature={selectedAssignature}
                        selectedCategory={category}
                        selectedCompetency={competence}
                        gradeChanged={gradeChanged}
                        classroomId={classroomId}
                        quarter={quarter}
                        byAssignature={byAssignature}
                    />}
                    {student.filtered_grades
                    .filter(grade => category === '0' || grade.category.toString() === category)
                    .sort((a, b) => a.activity - b.activity)
                    .map(grade => (
                        <GradesTableGradeCell 
                            key={grade.id}
                            grade={grade}
                            classroomId={classroomId}
                            competence={competence}
                            setGradeChanged={setGradeChanged}
                            quarter={quarter}
                            studentUid={(student.uid).toString()}
                        />
                    ))}
                </motion.div>
        ))}
    </div>
  )
}

export default GradesTableActivitiesBody