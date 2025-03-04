import { CheckCircle, AlertTriangle } from "lucide-react";
import { Tooltip } from "../../../ui/Tooltip";
import { useEffect, useState } from "react";
import { assignments } from "../../../../data/mockdataForGrades";
import { StudentByGrade, StudentGrade } from "../../../../services/api/studentsService";
import useCreateQuarterGrade from "../../../../hooks/api/quarterGrade/useCreateQuarterGrade";
import useNotificationsStore from "../../../../hooks/store/useNotificationsStore";
import useUpdateQuarterGrade from "../../../../hooks/api/quarterGrade/useUpdateQuarterGrade";
import useAuthStore from "../../../../hooks/store/useAuthStore";
import CreateAverageGrade from "./CreateAverageGrade";
import UpdateQuarterGrade from "./UpdateQuarterGrade";

const gradeOptions = ["A", "B", "C", "AD", "NA"];

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
  handleAverageChange: (studentId: number, competencyId: number, grade: string) => void
  selectedAssignature: string
  selectedCategory: string
  grades: StudentGrade[]
  gradeChanged: boolean
  classroomId: string
}

const AverageSelector = ({ 
  // student, 
  selectedCompetency, 
  handleAverageChange,
  selectedAssignature,
  selectedCategory,
  grades ,
  gradeChanged,
  student,
  classroomId
}: Props) => {

  const access = useAuthStore(s => s.access) || ''
  const [averageGrade, setAverageGrade] = useState('NA');
  // const [isApproved, setIsApproved] = useState(!!teacherConfirmed)
  const savedAvarageGrade = student.averages.find(average => (average.competence).toString() === selectedCompetency)
  const gradeQueryKey = [`students ${classroomId} ${selectedCompetency}`]
  const [isApproved, setIsApproved] = useState(false)
  const [isManuallyChanged, setIsManuallyChanged] = useState(false)
  const createQuarterGrade = useCreateQuarterGrade({ updateCacheKey: gradeQueryKey })
  // const updateQuarterGrade = savedAvarageGrade && useUpdateQuarterGrade({ quarterGradeId: (savedAvarageGrade.id).toString(), updateCacheKey: gradeQueryKey })
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
  // console.log('savedAvarageGrade', savedAvarageGrade);
  

  // This is quite important, you have to fix the promise to be resolved in the useEffect

  // useEffect(() => {
  //   const fetchUpdatedGrades = async () => {
  
  //     if (!student.filtered_grades || student.filtered_grades.length === 0) {
  //       setAverageGrade("NA");
  //       return;
  //     }
  
  //     try {

  //       await new Promise(resolve => {setTimeout(resolve, 500)}); 
  //       const numericGrades = student.filtered_grades.map(grade => gradeValues[grade.calification]);
  //       const validGrades = numericGrades.filter(grade => grade !== 0);
  //       const numericAverage = validGrades.length > 0
  //         ? validGrades.reduce((acc, grade) => acc + grade, 0) / validGrades.length
  //         : 0;
  
  //       const newAverageGrade = gradeReverse[Math.round(numericAverage)] || "NA";
  //       console.log('Updated Average Grade:', newAverageGrade);
  
  //       setAverageGrade(newAverageGrade);
  
  //     } catch (error) {
  //       console.error("Error fetching updated grades:", error);
  //     }
  //   };
  
  //   fetchUpdatedGrades();  // Call the async function
  
  // }, [student.filtered_grades, gradeChanged]);

  useEffect(() => {
    
    if (student.filtered_grades.length === 0) {
      setAverageGrade('NA')
      return
    }
    const numericGrades = student.filtered_grades.map(grade => gradeValues[grade.calification])
    // console.log('numericGrades', numericGrades);
    
    const validGrades = numericGrades.filter(grade => grade !== 0)
    // console.log('validGrades', validGrades);
    
    const numericAverage = validGrades.length > 0
      ? validGrades.reduce((acc, grade) => acc + grade, 0) / validGrades.length
      : 0;
    
    setAverageGrade(gradeReverse[Math.round(numericAverage)] || "NA")
  }, [student, gradeChanged]);




  // useEffect(() => {

  //   const filteredGrades = student.grades
  //       ? Object.keys(student.grades)
  //           .filter(grade => filteredAssignments.map(assignment => assignment.id).includes(parseInt(grade)))
  //           .filter(grade => student.grades[grade] !== 'NA')
  //           .map(grade => student.grades[grade])
  //       : []
  //   const numericAverage = filteredGrades.reduce((acc, grade) => acc + gradeValues[grade], 0) / filteredGrades.length;  
  //   console.log('numericAverage', numericAverage);
    
  //   setAverageGrade(gradeReverse[Math.round(numericAverage)])
  //   if (!isManuallyChanged) {
  //     setSelectedGrade(gradeReverse[Math.round(numericAverage)]);
  //   }
  //   console.log('averageGrade', averageGrade);
    
    
  // }, [averageGrade, student]);

  // const handleChange = (newGrade: string) => {
  //   console.log('Change', newGrade);
    
  //   setSelectedGrade(newGrade);
  //   setIsApproved(true)
  //   setIsManuallyChanged(true)
  //   handleAverageChange(student.id, parseInt(selectedCompetency), newGrade);

  // };

  // const handleApprove = () => {
  //   console.log('Approve', selectedGrade);
    
  //   setIsApproved(true);
  //   handleAverageChange(student.id, parseInt(selectedCompetency), selectedGrade);
  // };

  // const handleUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // setAverageGrade(e.target.value)
    // setIsLoading(true)
    // updateQuarterGrade && updateQuarterGrade.mutate({
    //   access,
    //   quarterGrade: {
    //     calification: e.target.value,
    //     conclusion: '',
    //     student: student.uid,
    //     competence: parseInt(selectedCompetency),
    //     assignature: parseInt(selectedAssignature),
    //     quarter: 'Q1'
    //   }
    // }, {
    //   onSuccess: () => {
    //     setShow(true)
    //     setType('success')
    //     setMessage('Nota actualizada exitosamente')
    //   },
    //   onError: () => {
    //     setShow(true)
    //     setType('error')
    //     setMessage('Error al actualizar la nota')
    //   },
    //   onSettled: () => {
    //     setIsLoading(false)
    //   }
    // })
  // }


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
      {/* <>{console.log('average', averageGrade)}</> */}
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

      {/* Approve Button (Only if it's a system-suggested grade) */}
      {!savedAvarageGrade 
      ? 
        <button
          className={`${isLoading && 'hidden'} absolute bottom-1 right-1 flex items-center gap-1 text-xs  text-gray-600 bg-yellow-200 hover:bg-yellow-300 dark:bg-yellow-800 dark:hover:bg-yellow-700 dark:text-gray-200 rounded-md shadow-md transition`}
          onClick={handleApprove}
        >
         Aprobar
        </button>
      : ''}
    </div>
  );
};

export default AverageSelector;
