import { useState } from "react";
import useUpdateGrade from "../../../../../hooks/api/grade/useUpdateGrade";
import useAuthStore from "../../../../../hooks/store/useAuthStore";
import { StudentGrade } from "../../../../../services/api/studentsService"
import useNotificationsStore from "../../../../../hooks/store/useNotificationsStore";

interface Props {
    grade: StudentGrade
    classroomId: string
    competence: string
    setGradeChanged: React.Dispatch<React.SetStateAction<boolean>>
    quarter: string
    studentUid: string
}

// `students ${classroomId} ${competence}`

const gradeOptions = ["A", "B", "C", "AD", "NA"]

const gradeStyles: Record<string, string> = {
    "A": "bg-blue-500 text-white",
    "B": "bg-yellow-500 text-white",
    "C": "bg-red-500 text-white",
    "AD": "bg-green-500 text-white",
    "NA": "dark:bg-gray-300 bg-gray-200 text-gray-700", 
  };

const GradesTableGradeCell = ({ grade, classroomId, competence, setGradeChanged, quarter, studentUid }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const updateCacheKey = [`students ${classroomId} ${competence} ${quarter}`]
    const { setType, setMessage, setShow } = useNotificationsStore()
    const [calification, setCalification] = useState(grade.calification)
    const updateGrade = useUpdateGrade({gradeId: grade.id, activityId: (grade.activity).toString(), updateCacheKey, studentUid})

    const handleUpdateGrade = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCalification(e.target.value)
        setGradeChanged(prev => !prev)
        updateGrade.mutate(
            {
                access, grade: { calification: e.target.value, observations: ''}
            },
        {
            onSuccess: () => {
                setShow(true)
                setType('success')
                setMessage('Calificación actualizada correctamente')
            },
            onError: () => {
                setShow(true)
                setType('error')
                setMessage('Error al actualizar la calificación')
            },
        })
    }

  return (
    <div 
        className="min-w-[160px] max-w-[160px] text-center p-[1px]"
    >
        <select
        className={` w-full h-full text-center font-semibold cursor-pointer outline-none transition-all duration-300 ${gradeStyles[calification]}`}
        value={calification}
        // onChange={(e) => handleGradeChange(student.id, assignment.id, e.target.value)}
        onChange={handleUpdateGrade}
        >
        {gradeOptions.map((grade) => (
            <option key={grade} value={grade}>
            {grade}
            </option>
        ))}
        </select>
    </div>
  )
}

export default GradesTableGradeCell