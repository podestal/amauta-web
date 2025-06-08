import { motion } from "framer-motion"
import useGetStudentsByAreaGrade from "../../../../../../hooks/api/student/useGetStudentsByAreaGrade"
import useAuthStore from "../../../../../../hooks/store/useAuthStore"
import { areas as dbAreas } from "../../../../../../data/mockdataForGrades"
import { Assignature } from "../../../../../../services/api/assignatureService"

// areas: string[]
// quarter: string
// clase: string

interface Props {
    areas: string[]
    quarter: string
    clase: string
    filterByName: string
    assignatures: Assignature[]
}

const gradeStyles: Record<string, string> = {
    "A": "bg-blue-500 text-white",
    "B": "bg-yellow-500 text-white",
    "C": "bg-red-500 text-white",
    "AD": "bg-green-500 text-white",
    "NA": "bg-gray-300 text-gray-700", 
};

const GradesTableBodyAreas = ({ areas, quarter, clase, filterByName, assignatures }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const {data: students, isLoading, isError, error, isSuccess} = useGetStudentsByAreaGrade({ access, areas, quarter, clase })
    const filteredAreasIds = assignatures.filter(assignature => assignature.clase === parseInt(clase)).map(assignature => assignature.area.toString());
    const filteredAreas = dbAreas.filter(area => filteredAreasIds.includes(area.id.toString()));
    if (isLoading) return <p className='text-center animate-pulse text-xs my-4'>Cargando...</p>
    if (isError) return <p className='text-center text-red-500 text-xs my-4'>Error: {error.message}</p>
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
                {student.area_grades
                    .sort((a, b) => a.area - b.area)
                    .map( areaGrade => (
                        <p>{areaGrade ? areaGrade.calification : 'NA'}</p>
                    ))
                }
                {filteredAreas
                .sort((a, b) => a.id - b.id)
                .map((area) => {
                    let areaGrade = student.area_grades.find(areaGrade => areaGrade.area.toString() === area.id.toString())
                    if (!areaGrade) {
                        areaGrade = {
                            id: 0,
                            area: parseInt(area.id.toString()),
                            calification: "NA",
                        }
                    }
                    return (
                        <div
                            key={area.id}
                            className="min-w-[160px] max-w-[160px] text-center p-[1px]"
                        >
                            <p className={`w-full min-h-[46px] max-h-[46px] flex justify-center items-center text-center font-semibold outline-none transition-all duration-300 ${gradeStyles[areaGrade.calification]}`}>{areaGrade.calification}</p>
                        </div>
                    )
                })}

            </motion.div>
        ))}
    </div>
  )
}

export default GradesTableBodyAreas