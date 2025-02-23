import { CheckCircle, AlertTriangle } from "lucide-react";
import { Tooltip } from "../../../ui/Tooltip";
import { useState } from "react";

const gradeOptions = ["A", "B", "C", "AD", "NA"];

interface Props {
  student: any;
  selectedCompetency: string;
  handleAverageChange: (studentId: number, competencyId: number, grade: string) => void;
  currentGrade: string;
}

const AverageSelector = ({ student, selectedCompetency, handleAverageChange, currentGrade }: Props) => {
  const systemSuggested = student.systemSuggestedGrades?.[parseInt(selectedCompetency)];
  const teacherConfirmed = student.teacherConfirmedGrades?.[parseInt(selectedCompetency)];

  // If teacher has already confirmed or changed, it becomes the selected grade
  const [selectedGrade, setSelectedGrade] = useState(currentGrade);
  const [isApproved, setIsApproved] = useState(!!teacherConfirmed);

  const handleChange = (newGrade: string) => {
    console.log('Change', newGrade);
    
    setSelectedGrade(newGrade);
    setIsApproved(true)
    handleAverageChange(student.id, parseInt(selectedCompetency), newGrade);
  };

  const handleApprove = () => {
    console.log('Approve', selectedGrade);
    
    setIsApproved(true);
    handleAverageChange(student.id, parseInt(selectedCompetency), selectedGrade);
  };

  return (
    <div className="relative min-w-[160px] max-w-[160px] text-center p-[1px]">
      <select
        className={`w-full min-h-[46px] max-h-[46px] text-center font-semibold cursor-pointer outline-none transition-all duration-300 
          ${isApproved ? "border-green-500 bg-green-100 dark:bg-green-900 dark:border-green-300" : 
           "border-yellow-500 bg-yellow-100 dark:bg-yellow-900 dark:border-yellow-300"}
        `}
        value={selectedGrade}
        onChange={(e) => handleChange(e.target.value)}
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
