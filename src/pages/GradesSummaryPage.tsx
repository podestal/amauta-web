import { useState } from "react";
import { motion } from "framer-motion";
import { assignments } from "../data/mockdataForGrades";
import { assignatures } from "../components/api/assignatures/Assignatures";
import { studentsTable as initialStudents, StudentsTable } from "../data/mockdataForGrades";
import Selector from "../components/ui/Selector";

const gradeOptions = ["A", "B", "C", "AD", "NA"]; // Grade choices

const GradesSummaryPage = () => {

  // const gradeValues: Record<string, number> = {
  //   "A": 3,
  //   "B": 2,
  //   "C": 1,
  //   "AD": 4,
  //   "NA": 1,
  // };
  
  // const gradeReverse: Record<number, string> = {
  //   3: "A",
  //   2: "B",
  //   1: "C",
  //   4: "AD",
  //   0: "NA",
  // };

  const gradeStyles: Record<string, string> = {
    "A": "bg-blue-500 text-white",
    "B": "bg-yellow-500 text-white",
    "C": "bg-red-500 text-white",
    "AD": "bg-green-500 text-white",
    "NA": "bg-gray-300 text-gray-700", 
  };

  const [students, setStudents] = useState<StudentsTable[]>(initialStudents);
  const [selectedAssignature, setSelectedAssignature] = useState('0');

  const [selectedQuarter, setSelectedQuarter] = useState('1');
  const [selectedCategory, setSelectedCategory] = useState('0');

  // Function to update grade
  const handleGradeChange = (studentId: number, assignmentId: number, newGrade: string) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId
          ? {
              ...student,
              grades: {
                ...student.grades,
                [assignmentId]: newGrade,
              },
            }
          : student
      )
    );
  };

  return (
    <div className="w-full mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-6">📊 Resumen de Calificaciones</h2>
      <div className="w-full grid grid-cols-3 gap-12 my-12">
        <Selector 
          label={"Curso"}
          values={assignatures.map(assignature => ({id: assignature.id.toString(), name: assignature.name}))}
          setter={setSelectedAssignature}
          lan="ES"
        />
        <Selector 
          label={"Bimestre"}
          values={[{id: '1', name: 'Bimestre 1'}, {id: '2', name: 'Bimestre 2'}, {id: '3', name: 'Bimestre 3'}, {id: '4', name: 'Bimestre 4'}]}
          setter={setSelectedQuarter}
          defaultValue={selectedQuarter}
          lan="ES"
        />
        <Selector 
          label="Categoría"
          values={[{id: '0', name: 'Todas'}, {id: '1', name: 'Tarea'}, {id: '2', name: 'Examen'}, {id: '3', name: 'Participación'}, {id:'4', name: 'Proyecto'}, {id: '6', name: 'Otro'}]}
          setter={setSelectedCategory}
          defaultValue={selectedCategory}
          lan="ES"
        />
      </div>
          {/* Table Header */}
          {/* <thead>
            <tr className="bg-gray-800 text-white" >
              <th className="py-3 px-4 text-left w-[50px]">Estudiante</th>
              {assignments
              .filter(assignment => (assignment.assignatureId ).toString() === selectedAssignature)
              .filter(assignment => selectedCategory === '0' || (assignment.categoryId ).toString() === selectedCategory)
              .map((assignment) => (
                <th key={assignment.id} className="py-3 px-4 text-center">
                  {assignment.name}
                </th>
              ))}
            </tr>
          </thead> */}
      <div className="overflow-x-auto">
      {selectedAssignature !== '0' && (
  <div className="w-full overflow-x-auto">
    <motion.div
      className="w-full min-w-max border-collapse bg-white dark:bg-gray-900 shadow-md rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Table Header */}
      <div className="flex bg-gray-800 text-white">
        <h2 className="min-w-[300px] max-w-[300px] py-3 px-4">Estudiante</h2>
        <h2 className="min-w-[160px] max-w-[160px] h-[100px] py-3 px-4 text-center">Promedio</h2>
        {assignments
          .filter(assignment => assignment.assignatureId.toString() === selectedAssignature)
          .filter(assignment => selectedCategory === '0' || assignment.categoryId.toString() === selectedCategory)
          .map((assignment) => (
            <h2 
              key={assignment.id} 
              className="min-w-[160px] max-w-[160px] h-[100px] py-3 px-4 text-center"
            >
              {assignment.name}
            </h2>
          ))}
      </div>

      {/* Table Rows */}
      {students.map((student, index) => (
        <motion.div
          key={student.id}
          className="w-full flex border-b border-gray-700 hover:bg-gray-800 transition-colors"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          {/* Student Name */}
          <h2 className="min-w-[300px] max-w-[300px] py-3 px-4">
            {student.firstName} {student.lastName}
          </h2>
          {/* Average Grade */}
          {student.averages[parseInt(selectedAssignature)] && (
            <h2 className={`min-w-[160px] max-w-[160px] py-3 px-4 text-center ${gradeStyles[student.averages[parseInt(selectedAssignature)]]}`}>
              {student.averages[parseInt(selectedAssignature)]}
            </h2>
          )}

          {/* Grades Selection */}
          {assignments
            .filter(assignment => assignment.assignatureId.toString() === selectedAssignature)
            .filter(assignment => selectedCategory === '0' || assignment.categoryId.toString() === selectedCategory)
            .map((assignment) => (
              <div 
                key={`${student.id}-${assignment.id}`} 
                className="min-w-[160px] max-w-[160px] px-4 py-1 text-center"
              >
                <select
                  className={` px-4 py-1 rounded-full font-semibold cursor-pointer outline-none transition-all duration-300 ${gradeStyles[student.grades?.[assignment.id]]}`}
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
          ))}
        </motion.div>
      ))}
    </motion.div>
  </div>
)}
      </div>
    </div>
  );
};

export default GradesSummaryPage;
