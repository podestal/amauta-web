import { useState } from "react";
import { motion } from "framer-motion";
import { assignments } from "../data/mockdataForGrades";
import { assignatures } from "../components/api/assignatures/Assignatures";
import { studentsTable as initialStudents, StudentsTable } from "../data/mockdataForGrades";
import Selector from "../components/ui/Selector";

const gradeOptions = ["A", "B", "C", "AD", "NA"]; // Grade choices

const GradesSummaryPage = () => {

  const gradeStyles: Record<string, string> = {
    "A": "bg-blue-500 text-white",
    "B": "bg-yellow-500 text-white",
    "C": "bg-red-500 text-white",
    "AD": "bg-green-500 text-white",
    "NA": "bg-gray-300 text-gray-700", 
  };

  const [students, setStudents] = useState<StudentsTable[]>(initialStudents);
  const [selectedAssignature, setSelectedAssignature] = useState('');

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
          values={assignatures}
          setter={setSelectedAssignature}
          lan="ES"
        />
        <Selector 
          label={"Bimestre"}
          values={[{id: '1', name: 'Bimestre 1'}, {id: '2', name: 'Bimestre 2'}, {id: '3', name: 'Bimestre 3'}, {id: '4', name: 'Bimestre 4'}]}
          setter={() => {}}
          lan="ES"
        />
        <Selector 
          label="Categoría"
          values={[{id: '1', name: 'Tarea'}, {id: '2', name: 'Examen'}, {id: '3', name: 'Proyecto'}, {id: '4', name: 'Todas'}]}
          setter={() => {}}
          lan="ES"
        />
      </div>

      <div className="overflow-x-auto">
        <motion.table
          className="w-full border-collapse bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-3 px-4 text-left w-[400px]">Estudiante</th>
              {assignments
              .filter(assignment => (assignment.assignatureId ).toString() === selectedAssignature)
              .map((assignment) => (
                <th key={assignment.id} className="py-3 px-4 text-center">
                  {assignment.name}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {students.map((student, index) => (
              <motion.tr
                key={student.id}
                className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <td className="py-3 px-4 font-semibold">
                  {student.firstName} {student.lastName}
                </td>
                {assignments
                .filter(assignment => (assignment.assignatureId ).toString() === selectedAssignature)
                .map((assignment) => (
                  <td key={assignment.id} className="py-3 px-4 text-center w-[200px]">
                    <select
                      className={`px-4 py-1 rounded-full font-semibold cursor-pointer outline-none transition-all duration-300 ${gradeStyles[student.grades?.[assignment.id]]}`}
                      value={student.grades?.[assignment.id] || "NA"}
                      onChange={(e) => handleGradeChange(student.id, assignment.id, e.target.value)}
                    >
                      {gradeOptions.map((grade) => (
                        <option key={grade} value={grade}>
                          {grade}
                        </option>
                      ))}
                    </select>
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>
    </div>
  );
};

export default GradesSummaryPage;
