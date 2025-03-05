import { CheckCircle, AlertTriangle } from "lucide-react";
import { Tooltip } from "../../../ui/Tooltip";
import { useEffect, useState } from "react";
import { StudentByGrade } from "../../../../services/api/studentsService";
import useCreateQuarterGrade from "../../../../hooks/api/quarterGrade/useCreateQuarterGrade";
import useNotificationsStore from "../../../../hooks/store/useNotificationsStore";
import useUpdateQuarterGrade from "../../../../hooks/api/quarterGrade/useUpdateQuarterGrade";
import useAuthStore from "../../../../hooks/store/useAuthStore";
import CreateAverageGrade from "./CreateAverageGrade";
import UpdateQuarterGrade from "./UpdateQuarterGrade";
import RemoveQuarterGrade from "./RemoveQuarterGrade";

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

interface Props {
  student:  StudentByGrade;
  selectedCompetency: string;
  selectedAssignature: string
  selectedCategory: string
  gradeChanged: boolean
  classroomId: string
}

const AverageSelector = ({ 
  selectedCompetency, 
  selectedAssignature,
  selectedCategory,
  gradeChanged,
  student,
  classroomId
}: Props) => {

  const access = useAuthStore(s => s.access) || ''
  const [averageGrade, setAverageGrade] = useState('NA');
  const savedAvarageGrade = student.averages.find(average => (average.competence).toString() === selectedCompetency)
  const gradeQueryKey = [`students ${classroomId} ${selectedCompetency}`]
  const createQuarterGrade = useCreateQuarterGrade({ updateCacheKey: gradeQueryKey })

  const getUpdateQuarterGrade = () => {
    if (!savedAvarageGrade) return null;
    return useUpdateQuarterGrade({ 
      quarterGradeId: (savedAvarageGrade.id).toString(), 
      updateCacheKey: gradeQueryKey 
    });
  };
  // const updateQuarterGrade = getUpdateQuarterGrade()
  const { setShow, setType, setMessage } = useNotificationsStore()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    
    if (student.filtered_grades.length === 0) {
      setAverageGrade('NA')
      return
    }
    const numericGrades = student.filtered_grades.map(grade => gradeValues[grade.calification])
    
    const validGrades = numericGrades.filter(grade => grade !== 0)
    
    const numericAverage = validGrades.length > 0
      ? validGrades.reduce((acc, grade) => acc + grade, 0) / validGrades.length
      : 0;
    
    setAverageGrade(gradeReverse[Math.round(numericAverage)] || "NA")
  }, [student, gradeChanged]);


  const handleApprove = () => {
    setIsLoading(true)
    createQuarterGrade.mutate({
      access,
      quarterGrade: {
        calification: averageGrade,
        conclusion: '',
        student: student.uid,
        competence: parseInt(selectedCompetency),
        assignature: parseInt(selectedAssignature),
        quarter: 'Q1'
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
      {savedAvarageGrade 
      ? 
      <UpdateQuarterGrade 
        getUpdateQuarterGrade={getUpdateQuarterGrade}
        savedAvarageGrade={savedAvarageGrade}
        averageGrade={averageGrade}
        setIsLoading={setIsLoading}
        setAverageGrade={setAverageGrade}
        studentId={student.uid}
        competency={selectedCompetency}
        assignature={selectedAssignature}
      /> 
      : 
      <CreateAverageGrade 
        savedAvarageGrade={savedAvarageGrade}
        averageGrade={averageGrade}
        createQuarterGrade={createQuarterGrade}
        setIsLoading={setIsLoading}
        setAverageGrade={setAverageGrade}
        studentId={student.uid}
        competency={selectedCompetency}
        assignature={selectedAssignature}
      />}
      </>
      }
      {/* Status Icon with Tooltip */}
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
         Aprobar
        </button>
      : <RemoveQuarterGrade 
          isLoading={isLoading} 
          updateCacheKey={gradeQueryKey}
          quarterGradeId={(savedAvarageGrade.id).toString()}
          setIsLoading={setIsLoading}
        />}
    </div>
  );
};

export default AverageSelector;
