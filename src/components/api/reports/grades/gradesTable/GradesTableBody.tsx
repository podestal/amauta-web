import { motion } from "framer-motion"
import useGetStudentsByQuarterGrade from "../../../../../hooks/api/student/useGetStudentsByQuarterGrade"
import useAuthStore from "../../../../../hooks/store/useAuthStore"
import TextAreaRow from "../../../../ui/TextAreaRow"

interface Props {
    classroomId: string
    competencies: string[]
    selectedQuarter: string
}

const gradeOptions = ["A", "B", "C", "AD", "NA"]

const gradeStyles: Record<string, string> = {
    "A": "bg-blue-500 text-white",
    "B": "bg-yellow-500 text-white",
    "C": "bg-red-500 text-white",
    "AD": "bg-green-500 text-white",
    "NA": "bg-gray-300 text-gray-700", 
  };

const GradesTableBody = ({ classroomId, competencies, selectedQuarter }: Props) => {
    
    const access = useAuthStore(s => s.access) || ''
    const { data: students, isLoading, isError, error, isSuccess } = useGetStudentsByQuarterGrade({ access, classroomId, competencies, assignatureId: '', quarter: selectedQuarter })

    if (isLoading) return <p className="animate-pulse text-center my-8 text-xl">Cargando...</p>

    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess) 

  return (
    <div className="w-full">
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
                {competencies.map((competency, index) => {
                    let quarterGrade = student.averages.find(average => (average.competence).toString() === competency)
                    if (!quarterGrade) {
                        quarterGrade = {
                            id: 0,
                            competence: parseInt(competency),
                            calification: "NA",
                            conclusion: ""
                        }

                    }
                    return (
                        <div
                            key={index}
                            className="min-w-[400px] max-w-[400px] text-center p-[1px] grid grid-cols-3"
                        >
                        <select
                            className={` w-full min-h-[46px] max-h-[46px] text-center font-semibold cursor-pointer outline-none transition-all duration-300 ${gradeStyles[quarterGrade.calification]}`}
                            value={quarterGrade.calification}
                            // onChange={(e) => handleAverageChange(student.id, competency.id, e.target.value)}
                            onChange={(e) => console.log(e)}
                            >
                            {gradeOptions.map((grade) => (
                                <option key={grade} value={grade}>
                                {grade}
                                </option>
                            ))}
                            </select>
                            <div className=" col-span-2 ml-2 flex items-start">
                                <TextAreaRow 
                                    onSubmit={(e) => console.log(e)}
                                    placeholder="Conclusión descriptiva..."
                                    canUpdate={quarterGrade.calification !== "NA"}
                                    quarterGrade={quarterGrade}
                                />
                            </div>
                        </div>
                    )
                })}
            </motion.div>
        ))}
    </div>
  )
}

export default GradesTableBody