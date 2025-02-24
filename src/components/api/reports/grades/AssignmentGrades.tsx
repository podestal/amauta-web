import { useEffect } from "react"
import { assignments } from "../../../../data/mockdataForGrades"

interface Props {
    student: any
    handleGradeChange: (studentId: number, assignmentId: number, grade: string) => void
    selectedAssignature: string
    selectedCategory: string
    selectedComeptency: string
    setCalculatedAverage: React.Dispatch<React.SetStateAction<string>>
}

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

const gradeStyles: Record<string, string> = {
    "A": "bg-blue-500 text-white",
    "B": "bg-yellow-500 text-white",
    "C": "bg-red-500 text-white",
    "AD": "bg-green-500 text-white",
    "NA": "bg-gray-300 text-gray-700", 
  };

const AssignmentGrades = ({ 
    student, 
    handleGradeChange,
    selectedAssignature,
    selectedCategory,
    selectedComeptency,
    setCalculatedAverage
}: Props) => {

    const filteredAssignments = assignments            
        .filter(assignment => assignment.assignatureId.toString() === selectedAssignature)
        .filter(assignment => selectedCategory === '0' || assignment.categoryId.toString() === selectedCategory)
        .filter(assignment => assignment.competencies.includes(parseInt(selectedComeptency)))
    
    const filteredGrades = student.grades
        ? Object.keys(student.grades)
            .filter(grade => filteredAssignments.map(assignment => assignment.id).includes(parseInt(grade)))
            .filter(grade => student.grades[grade] !== 'NA')
            .map(grade => student.grades[grade])
        : []
    const numericAverage = filteredGrades.reduce((acc, grade) => acc + gradeValues[grade], 0) / filteredGrades.length;
    const averageGrade = gradeReverse[Math.round(numericAverage)];    
    // console.log('averageGrade', averageGrade);

    useEffect(() => {
        setCalculatedAverage(averageGrade)
    }, [averageGrade])

  return (
    <>
        {filteredAssignments
            .map( assignment => (
                <div 
                    key={`${student.id}-${assignment.id}`} 
                    className="min-w-[160px] max-w-[160px] text-center p-[1px]"
                >
                    <select
                    className={` w-full h-full text-center font-semibold cursor-pointer outline-none transition-all duration-300 ${gradeStyles[student.grades?.[assignment.id]]}`}
                    value={student.grades?.[assignment.id] || "NA"}
                    onChange={(e) => handleGradeChange(student.id, assignment.id, e.target.value)}
                    >
                    {gradeOptions.map((grade) => (
                        <option key={grade} value={grade}>
                        {grade}
                        </option>
                    ))}
                    </select>
                </div>
            ))
        }
    </>
  )
}

export default AssignmentGrades