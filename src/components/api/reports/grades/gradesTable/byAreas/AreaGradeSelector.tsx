import useCreateAreaGrade from "../../../../../../hooks/api/areaGrade/useCreateAreaGrade"
import useUpdateAreaGrade from "../../../../../../hooks/api/areaGrade/useUpdateAreaGrade"
import useAuthStore from "../../../../../../hooks/store/useAuthStore"
import { AreaGrade } from "../../../../../../services/api/studentsService"

interface Props {
    areaGrade: AreaGrade
    quarter: string
    studentId: number
    areaId: number
    clase: string
    assignatures: string[]
}

const gradeOptions = ["A", "B", "C", "AD", "NA"]

const AreaGradeSelector = ({ areaGrade, quarter, studentId, areaId, clase, assignatures }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const createAreaGrade = useCreateAreaGrade({  assignatures, clase })
    const updateAreaGrade = useUpdateAreaGrade({ assignatures, clase, areaGradeId: areaGrade?.id })

    const handleCreate = (e: React.ChangeEvent<HTMLSelectElement>) => {
        
        areaGrade ? console.log('areaGrade exists') : console.log('areaGrade does not exist')
        if (areaGrade) {
            updateAreaGrade.mutate({
                access,
                areaGrade: {
                    calification: e.target.value,
                    student: studentId,
                    quarter,
                    area: areaId,
                }
            })
        } else {
            createAreaGrade.mutate({
                access,
                areaGrade: {
                    calification: e.target.value,
                    student: studentId,
                    quarter,
                    area: areaId
                }
            })
        }
    }

  return (
    <select
        className={`min-w-[160px] max-w-[160px] min-h-[46px] max-h-[46px] text-center font-semibold cursor-pointer outline-none transition-all duration-300 
            ${areaGrade ? "border-green-500 bg-green-100 dark:bg-green-900 dark:border-green-300" : 
            "border-yellow-500 bg-yellow-100 dark:bg-yellow-900 dark:border-yellow-300"}
        `}
        value={areaGrade ? areaGrade.calification : 'NA'}
        onChange={handleCreate}
        // onChange={e => setAverageGrade(e.target.value)}
        >
        {gradeOptions.map((grade) => (
            <option key={grade} value={grade}>
            {grade}
            </option>
        ))}
    </select>
  )
}

export default AreaGradeSelector