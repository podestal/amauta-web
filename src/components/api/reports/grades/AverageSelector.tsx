import { CheckCircle, AlertTriangle } from "lucide-react";
import { Tooltip } from "../../../ui/Tooltip";
import { useEffect, useState } from "react";
import { assignments } from "../../../../data/mockdataForGrades";
import { StudentByGrade, StudentGrade } from "../../../../services/api/studentsService";
import useCreateQuarterGrade from "../../../../hooks/api/quarterGrade/useCreateQuarterGrade";

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
  selectedComeptency: string
  grades: StudentGrade[]
  gradeChanged: boolean
}

const AverageSelector = ({ 
  // student, 
  selectedCompetency, 
  handleAverageChange,
  selectedAssignature,
  selectedCategory,
  selectedComeptency,
  grades ,
  gradeChanged,
  student,
}: Props) => {

  const [averageGrade, setAverageGrade] = useState('NA');
  // const [isApproved, setIsApproved] = useState(!!teacherConfirmed)
  const [isApproved, setIsApproved] = useState(false)
  const [isManuallyChanged, setIsManuallyChanged] = useState(false)
  const createQuarterGrade = useCreateQuarterGrade({})

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
    console.log('numericAverage', gradeReverse[Math.round(numericAverage)]);
    
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


  const handleApprove = () => {
    createQuarterGrade.mutate({
      access: '',
      quarterGrade: {
        calification: averageGrade,
        conclusion: '',
        student: student.uid,
        competence: parseInt(selectedCompetency),
        assignature: parseInt(selectedAssignature),
        quarter: 'Q1'
      }
    })
  }

  return (
    <div className="relative min-w-[160px] max-w-[160px] text-center p-[1px]">
      {/* <>{console.log('average', averageGrade)}</> */}
      <select
        className={`w-full min-h-[46px] max-h-[46px] text-center font-semibold cursor-pointer outline-none transition-all duration-300 
          ${isApproved ? "border-green-500 bg-green-100 dark:bg-green-900 dark:border-green-300" : 
           "border-yellow-500 bg-yellow-100 dark:bg-yellow-900 dark:border-yellow-300"}
        `}
        value={averageGrade}
        onChange={(e) => setAverageGrade(e.target.value)}
      >
        {gradeOptions.map((grade) => (
          <option key={grade} value={grade}>
            {grade}
          </option>
        ))}
      </select>

      {/* Status Icon with Tooltip */}
      <div className="absolute top-1 left-1">
        <Tooltip
          content={isApproved ? "Nota Confirmada" : "Nota sugerida por el sistema"}
        >
          {isApproved ? (
            <CheckCircle className="text-green-500 w-5 h-5" />
          ) : (
            <AlertTriangle className="text-yellow-500 w-5 h-5" />
          )}
        </Tooltip>
      </div>

      {/* Approve Button (Only if it's a system-suggested grade) */}
      {!isApproved && (
        <button
          className="absolute bottom-1 right-1 flex items-center gap-1 text-xs  text-gray-600 bg-yellow-200 hover:bg-yellow-300 dark:bg-yellow-800 dark:hover:bg-yellow-700 dark:text-gray-200 rounded-md shadow-md transition"
          onClick={handleApprove}
        >
         Aprobar
        </button>
      )}
    </div>
  );
};

export default AverageSelector;
