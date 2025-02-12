import { useState } from "react";
import { motion } from "framer-motion";

// Define grades and their styles
const gradeOptions = ["", "C", "B", "A", "AD"];
const gradeStyles: Record<string, string> = {
  "A": "bg-blue-500 text-white",
  "B": "bg-yellow-500 text-white",
  "C": "bg-red-500 text-white",
  "AD": "bg-green-500 text-white",
  "": "bg-gray-300 text-gray-700", // Unqualified students
};

// Sample students data
const initialStudents = [
  { id: 1, name: "Juan Pérez", grade: "A" },
  { id: 2, name: "María López", grade: "B" },
  { id: 3, name: "Carlos Sánchez", grade: "C" },
  { id: 4, name: "Lucía Rodríguez", grade: "AD" },
  { id: 5, name: "Pedro Gómez", grade: "" },
  { id: 6, name: "Ana Martínez", grade: "B" },
  { id: 7, name: "Javier Díaz", grade: "A" },
  { id: 8, name: "Elena Fernández", grade: "C" },
  { id: 9, name: "Sofía Ramírez", grade: "" },
  { id: 10, name: "Hugo Torres", grade: "AD" },
  { id: 11, name: "Isabel Vega", grade: "B" },
  { id: 12, name: "Fernando Navarro", grade: "" },
  { id: 13, name: "Valentina Ruiz", grade: "C" },
  { id: 14, name: "Diego Castro", grade: "A" },
  { id: 15, name: "Camila Herrera", grade: "B" },
];

const GradesPage = () => {
  const [students, setStudents] = useState(initialStudents);

  // Function to update the grade
  const handleGradeChange = (id: number, newGrade: string) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, grade: newGrade } : student
      )
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-center mb-6">📊 Calificaciones</h2>

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
              <th className="py-3 px-4 text-left">DNI</th>
              <th className="py-3 px-4 text-left">Estudiante</th>
              <th className="py-3 px-4 text-center">Calificación</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {students
                .map((student, index) => (
              <motion.tr
                key={student.id}
                className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <td className="py-3 px-4">{student.id}</td>
                <td className="py-3 px-4">{student.name}</td>
                <td className="py-3 px-4 text-center">
                  {/* Grade Dropdown */}
                  <select
                    className={`px-4 py-1 rounded-full font-semibold cursor-pointer outline-none transition-all duration-300 ${gradeStyles[student.grade]}`}
                    value={student.grade}
                    onChange={(e) => handleGradeChange(student.id, e.target.value)}
                  >
                    {gradeOptions.map((grade) => (
                      <option key={grade} value={grade}>
                        {grade || "No calificado"}
                      </option>
                    ))}
                  </select>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>
    </div>
  );
};

export default GradesPage;
