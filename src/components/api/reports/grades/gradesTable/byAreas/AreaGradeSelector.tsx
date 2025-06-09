import { AlertTriangle, CheckCircle } from "lucide-react"
import useCreateAreaGrade from "../../../../../../hooks/api/areaGrade/useCreateAreaGrade"
import useUpdateAreaGrade from "../../../../../../hooks/api/areaGrade/useUpdateAreaGrade"
import useAuthStore from "../../../../../../hooks/store/useAuthStore"
import { AreaGrade, StudentByAssignatureGrade } from "../../../../../../services/api/studentsService"
import { Tooltip } from "../../../../../ui/Tooltip"
import { useEffect, useState } from "react"
import useNotificationsStore from "../../../../../../hooks/store/useNotificationsStore"
import useRemoveAreaGrade from "../../../../../../hooks/api/areaGrade/useRemoveAreaGrade"

interface Props {
    areaGrade: AreaGrade
    quarter: string
    student: StudentByAssignatureGrade
    areaId: number
    clase: string
    assignatures: string[]
}

const gradeOptions = ["A", "B", "C", "AD", "NA"]

const gradeValues: Record<string, number> = {
    "A": 3,
    "B": 2,
    "C": 1,
    "AD": 4,
    "NA": 0,
  };
  
  const gradeReverse: Record<number, string> = {
    3: "A",
    2: "B",
    1: "C",
    4: "AD",
    0: "NA",
  };

const AreaGradeSelector = ({ areaGrade, quarter, student, areaId, clase, assignatures }: Props) => {

    const { setMessage, setShow, setType } = useNotificationsStore()
    const access = useAuthStore(s => s.access) || ''
    const removeAreaGrade = useRemoveAreaGrade({  assignatures, clase, areaGradeId: areaGrade?.id, quarter, areaId })
    const createAreaGrade = useCreateAreaGrade({  assignatures, clase })
    const updateAreaGrade = useUpdateAreaGrade({ assignatures, clase, areaGradeId: areaGrade?.id })
    const [averageGrade, setAverageGrade] = useState('NA')
    const savedAvarageGrade = student.area_grades[0] || undefined;
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (student.assignature_grades.length === 0) {
            setAverageGrade('NA')
            return
          }
          
        const numericGrades = student.assignature_grades.map(grade => gradeValues[grade.calification])
        const validGrades = numericGrades.filter(grade => grade !== 0)
        const numericAverage = validGrades.length > 0
        ? validGrades.reduce((acc, grade) => acc + grade, 0) / validGrades.length
        : 0;
        
        setAverageGrade(gradeReverse[Math.round(numericAverage)] || "NA")
    }, [student])

    const handleRemove = () => {
        setIsLoading(true)
        removeAreaGrade.mutate({
            access,
        }, {
            onSuccess: () => {
                setShow(true)
                setType('success')
                setMessage('Nota eliminada exitosamente')
            },
            onError: err => {
                console.log('error', err);
                setShow(true)
                setType('error')
                setMessage('Error al eliminar la nota')
            },
            onSettled: () => {
                setIsLoading(false)
            }
        })

    }

    const handleApprove = () => {
        setIsLoading(true)
        createAreaGrade.mutate({
            access,
            areaGrade: {
                calification: averageGrade,
                student: student.uid,
                quarter,
                area: areaId
            }
        }, {
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
    }
    

    const handleCreate = (e: React.ChangeEvent<HTMLSelectElement>) => {
        
        setIsLoading(true)
        if (areaGrade) {
            updateAreaGrade.mutate({
                access,
                areaGrade: {
                    calification: e.target.value,
                    student: student.uid,
                    quarter,
                    area: areaId,
                }
            }, {
                onSuccess: () => {
                    setShow(true)
                    setType('success')
                    setMessage('Nota actualizada exitosamente')
                },
                onError: err => {
                    console.log('error', err);
                    setShow(true)
                    setType('error')
                    setMessage('Error al actualizar la nota')
                },
                onSettled: () => {
                    setIsLoading(false)
                }
            })
        } else {
            createAreaGrade.mutate({
                access,
                areaGrade: {
                    calification: e.target.value,
                    student: student.uid,
                    quarter,
                    area: areaId
                }
            }, {
                onSuccess: () => {
                    setShow(true)
                    setType('success')
                    setMessage('Nota guardad exitosamente')
                },
                onError: err => {
                    console.log('error', err);
                    setShow(true)
                    setType('error')
                    setMessage('Error al guardar la nota')
                },
                onSettled: () => {
                    setIsLoading(false)
                }
            })
        }
    }

  return (
    <div className="relative min-w-[160px] max-w-[160px] text-center p-[1px]">
        {isLoading 
        ? 
        <div className={`w-full min-h-[46px] max-h-[46px] text-center font-semibold cursor-pointer outline-none transition-all duration-300 
        ${savedAvarageGrade ? "border-green-500 bg-green-100 dark:bg-green-900 dark:border-green-300" : 
            "border-yellow-500 bg-yellow-100 dark:bg-yellow-900 dark:border-yellow-300"}
        `}>...</div> 
        : 
        <>
        <select
            className={`min-w-[160px] max-w-[160px] min-h-[46px] max-h-[46px] text-center font-semibold cursor-pointer outline-none transition-all duration-300 
                ${areaGrade ? "border-green-500 bg-green-100 dark:bg-green-900 dark:border-green-300" : 
                "border-yellow-500 bg-yellow-100 dark:bg-yellow-900 dark:border-yellow-300"}
            `}
            value={areaGrade ? areaGrade.calification : averageGrade}
            onChange={handleCreate}
            // onChange={e => setAverageGrade(e.target.value)}
            >
            {gradeOptions.map((grade) => (
                <option key={grade} value={grade}>
                {grade}
                </option>
            ))}
        </select>
        <div className="absolute top-1 left-1">
            <Tooltip
                content={savedAvarageGrade ? "Nota Confirmada" : "Nota sugerida por el sistema"}
            >
                {savedAvarageGrade ? (
                <CheckCircle className="text-green-500 w-5 h-5" />
                ) : (
                <AlertTriangle className="text-yellow-500 w-5 h-5" />
                )}
            </Tooltip>
        </div>
        {!savedAvarageGrade 
        ? 
            <button
                className={`${isLoading && 'hidden'} absolute bottom-1 right-1 flex items-center gap-1 text-xs  text-gray-600 bg-yellow-200 hover:bg-yellow-300 dark:bg-yellow-800 dark:hover:bg-yellow-700 dark:text-gray-200 rounded-md shadow-md transition`}
                onClick={handleApprove}
                >
                Guardar
            </button>
        : 
            <button
                className={`${isLoading && 'hidden'} absolute bottom-1 right-1 flex items-center gap-1 text-xs  text-gray-600 bg-green-200 hover:bg-green-300 dark:bg-green-800 dark:hover:bg-green-700 dark:text-gray-200 rounded-md shadow-md transition`}
                onClick={handleRemove}
            >
                Calcular
            </button>
        }
        </>}
    </div>
  )
}

export default AreaGradeSelector