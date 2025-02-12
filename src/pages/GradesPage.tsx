import { useState } from "react";
import { motion } from "framer-motion";
import { students as initialStudents } from "../data/mockdataForGrades";

// Define grades and their styles
const gradeOptions = ["NA", "C", "B", "A", "AD"];
const gradeStyles: Record<string, string> = {
  "A": "bg-blue-500 text-white",
  "B": "bg-yellow-500 text-white",
  "C": "bg-red-500 text-white",
  "AD": "bg-green-500 text-white",
  "NA": "bg-gray-300 text-gray-700", 
};

// Sample students data


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
    <div className="w-full max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1380px] mx-auto px-6 py-12">
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
                <th className="py-3 px-4 text-left">Apellido</th>
                <th className="py-3 px-4 text-left">Nombre</th>
                <th className="py-3 px-4 text-center">Calificación</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {students
                .sort((a, b) => a.lastName.localeCompare(b.lastName))
                .map((student, index) => (
              <motion.tr
                key={student.id}
                className="border-bborder-gray-700 hover:bg-gray-800 transition-colors"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <td className="py-3 px-4">{student.id}</td>
                <td className="py-3 px-4">{student.lastName}</td>
                <td className="py-3 px-4">{student.firstName}</td>
                <td className="py-3 px-4 text-center">
                  {/* Grade Dropdown */}
                  <select
                    className={`px-4 py-1 rounded-full font-semibold cursor-pointer outline-none transition-all duration-300 ${gradeStyles[student.grade]}`}
                    value={student.grade}
                    onChange={(e) => handleGradeChange(student.id, e.target.value)}
                  >
                    {gradeOptions.map((grade) => (
                      <option key={grade} value={grade}>
                        {grade}
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
