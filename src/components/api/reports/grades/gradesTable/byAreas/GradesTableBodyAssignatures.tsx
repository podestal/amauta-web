import { motion } from "framer-motion"
import useGetStudentsByAssignatureGrade from "../../../../../../hooks/api/student/useGetStudentsByAssignatureGrade"
import useAuthStore from "../../../../../../hooks/store/useAuthStore"
import { Assignature } from "../../../../../../services/api/assignatureService"
import AreaGradeSelector from "./AreaGradeSelector"

interface Props {
    area: string
    assignatures: Assignature[]
    clase: string
    quarter: string
    filterByName: string
}

const gradeStyles: Record<string, string> = {
    "A": "bg-blue-500 text-white",
    "B": "bg-yellow-500 text-white",
    "C": "bg-red-500 text-white",
    "AD": "bg-green-500 text-white",
    "NA": "bg-gray-300 text-gray-700", 
}

const GradesTableBodyAssignatures = ({ area, assignatures, clase, quarter, filterByName }: Props) => {

    // console.log('assignature', assignature)

    const access = useAuthStore(s => s.access) || ''
    const filteredAssignaturesIds = assignatures
        .filter(assignature => assignature.clase === parseInt(clase) && assignature.area.toString() === area)
        .sort((a, b) => a.id - b.id)
        .map(assignature => assignature.id.toString());
    const { data: students, isLoading, isError, error, isSuccess } = useGetStudentsByAssignatureGrade({ access, assignatures: filteredAssignaturesIds, clase, quarter, area })

    if (isLoading) return <p className="animate-pulse text-center my-8 text-xl">Cargando...</p>
    if (isError) return <p>Error: {error.message}</p>
    if (isSuccess)

  return (
    <div className="w-full">
        <>{console.log('students', students)}</>
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
                <AreaGradeSelector 
                    areaGrade={student.area_grades[0]}
                    quarter={quarter}
                    student={student}
                    areaId={parseInt(area)}
                    clase={clase}
                    assignatures={filteredAssignaturesIds}
                />
                {/* <AverageSelector 
                    student={student}
                    selectedAssignature={selectedAssignature}
                    selectedCategory={category}
                    selectedCompetency={competence}
                    gradeChanged={gradeChanged}
                    classroomId={classroomId}
                    quarter={quarter}
                    byAssignature={byAssignature}
                /> */}
                {filteredAssignaturesIds
                .sort((a, b) => parseInt(a) - parseInt(b))
                .map((assignatureId) => {
                    let assignatureGrade = student.assignature_grades.find(assignatureGrade => assignatureGrade.assignature.toString() === assignatureId)
                    if (!assignatureGrade) {
                        assignatureGrade = {
                            id: 0,
                            assignature: parseInt(assignatureId),
                            calification: "NA",
                        }
                    }
                    return (
                        <div
                            key={assignatureId}
                            className="min-w-[160px] max-w-[160px] text-center p-[1px]"
                        >
                            <p className={`w-full min-h-[46px] max-h-[46px] flex justify-center items-center text-center font-semibold outline-none transition-all duration-300 ${gradeStyles[assignatureGrade.calification]}`}>{assignatureGrade.calification}</p>
                        </div>
                    )
                })}

            </motion.div>
        ))}
    </div>
  )
}

export default GradesTableBodyAssignatures