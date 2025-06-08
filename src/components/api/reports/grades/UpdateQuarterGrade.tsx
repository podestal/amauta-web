import { UseMutationResult } from "@tanstack/react-query"
import { QuarterGrade } from "../../../../services/api/quarterGradeService"
import { CreateQuarterGradeData } from "../../../../hooks/api/quarterGrade/useUpdateQuarterGrade"
import { Average } from "../../../../services/api/studentsService"
import useNotificationsStore from "../../../../hooks/store/useNotificationsStore"
import useAuthStore from "../../../../hooks/store/useAuthStore"
import { useState } from "react"

interface Props{
    getUpdateQuarterGrade: () => UseMutationResult<QuarterGrade, Error, CreateQuarterGradeData> | null
    savedAvarageGrade: Average | undefined
    averageGrade: string
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    setAverageGrade: React.Dispatch<React.SetStateAction<string>>
    studentId: number
    competency: string
    assignature: string
    quarter: string
}

const gradeOptions = ["A", "B", "C", "AD", "NA"]

const UpdateQuarterGrade = ({ 
    getUpdateQuarterGrade,
    savedAvarageGrade,
    averageGrade,
    setIsLoading,
    setAverageGrade,
    studentId,
    competency,
    assignature,
    quarter
}: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const { setShow, setType, setMessage } = useNotificationsStore()
    const updateQuarterGrade = getUpdateQuarterGrade()
    const [localAverageGrade, setLocalAverageGrade] = useState(savedAvarageGrade?.calification || averageGrade)

    const handleUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log('updating');
        
        setAverageGrade(e.target.value)
        setLocalAverageGrade(e.target.value)
        
        // setIsLoading(true)
        updateQuarterGrade && updateQuarterGrade.mutate({
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
            setMessage('Nota actualizada exitosamente')
            
          },
          onError: () => {
            setShow(true)
            setType('error')
            setMessage('Error al actualizar la nota')
          },
          onSettled: () => {
            setIsLoading(false)
          }
        })
        
    }

  return (
    <select
        className={`w-full min-h-[46px] max-h-[46px] text-center font-semibold cursor-pointer outline-none transition-all duration-300 
            ${savedAvarageGrade ? "border-green-500 bg-green-100 dark:bg-green-900 dark:border-green-300" : 
            "border-yellow-500 bg-yellow-100 dark:bg-yellow-900 dark:border-yellow-300"}
        `}
        value={localAverageGrade}
        onChange={handleUpdate}
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

export default UpdateQuarterGrade