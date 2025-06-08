import { UseMutationResult } from "@tanstack/react-query"
import { AssignatureGrade, Average } from "../../../../services/api/studentsService"
import { CreateQuarterGradeData } from "../../../../hooks/api/quarterGrade/useUpdateQuarterGrade"
import { QuarterGrade } from "../../../../services/api/quarterGradeService"
import useAuthStore from "../../../../hooks/store/useAuthStore"
import useNotificationsStore from "../../../../hooks/store/useNotificationsStore"
import { CreateAssignatureGradeData } from "../../../../hooks/api/assignatureGrade/useCreateAssignatureGrade"

interface Props {
    savedAvarageGrade: Average | undefined
    averageGrade: string
    createQuarterGrade: UseMutationResult<QuarterGrade, Error, CreateQuarterGradeData>
    createAssignatureGrade: UseMutationResult<AssignatureGrade, Error, CreateAssignatureGradeData>
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    setAverageGrade: React.Dispatch<React.SetStateAction<string>>
    studentId: number
    competency: string
    assignature: string
    quarter: string
    byAssignature?: boolean
}

const gradeOptions = ["A", "B", "C", "AD", "NA"]

const CreateAverageGrade = ({ 
    savedAvarageGrade, 
    averageGrade, 
    createQuarterGrade, 
    createAssignatureGrade, 
    setIsLoading, 
    setAverageGrade, 
    studentId, 
    competency, 
    assignature,
    quarter,
    byAssignature= false }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const { setShow, setType, setMessage } = useNotificationsStore()

    const handleCreate = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setIsLoading(true)
        setAverageGrade(e.target.value)

        if (byAssignature) {
            createAssignatureGrade.mutate({
                access,
                assignatureGrade: {
                  calification: e.target.value,
                  assignature: parseInt(assignature),
                  student: studentId,
                  quarter
              }}, {
                onSuccess: () => {
                  setShow(true)
                  setType('success')
                  setMessage('Nota aprobada exitosamente')
                },
                onError: err => {
                    console.log('error', err);
                    
                  setShow(true)
                  setType('error')
                  setMessage('Error al aprobar la nota')
                },
                onSettled: () => {
                  setIsLoading(false)
                }
              })

        } else {
            createQuarterGrade.mutate({
                access,
                quarterGrade: {
                    calification: e.target.value,
                    conclusion: '',
                    student: studentId,
                    competence: parseInt(competency),
                    assignature: parseInt(assignature),
                    quarter
                }
                }, {
                onSuccess: () => {
                    setShow(true)
                    setType('success')
                    setMessage('Nota aprobada exitosamente')
                },
                onError: () => {
                    setShow(true)
                    setType('error')
                    setMessage('Error al aprobar la nota')
                },
                onSettled: () => {
                    setIsLoading(false)
                }
                })
        }

    }

  return (
    <select
        className={`w-full min-h-[46px] max-h-[46px] text-center font-semibold cursor-pointer outline-none transition-all duration-300 
            ${savedAvarageGrade ? "border-green-500 bg-green-100 dark:bg-green-900 dark:border-green-300" : 
            "border-yellow-500 bg-yellow-100 dark:bg-yellow-900 dark:border-yellow-300"}
        `}
        value={savedAvarageGrade ? savedAvarageGrade.calification : averageGrade}
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

export default CreateAverageGrade