import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { 
    FaShapes, FaCalculator, FaSuperscript, FaFlask, FaLanguage, 
    FaBookOpen, FaPaintBrush, FaGlobeAmericas, FaTheaterMasks, 
    FaDumbbell, FaRobot, FaChalkboardTeacher, FaLaptopCode, 
    FaMusic, FaLeaf, FaAtom 
  } from "react-icons/fa";
import { mockStudents } from "../data/mockdataForGrades";
import moment from "moment";

const gradeScale: Record<number, string> = {
  1: "C", // Lowest
  2: "B",
  3: "A",
  4: "AD", // Highest
};

// Define styles and icons for each subject
const assignatureStyles = [
    { id: 1, icon: <FaShapes />, styles: "bg-blue-500 text-blue-100 hover:bg-blue-600" },      // Geometry
    { id: 2, icon: <FaCalculator />, styles: "bg-green-500 text-green-100 hover:bg-green-600" },  // Math
    { id: 3, icon: <FaSuperscript />, styles: "bg-purple-500 text-purple-100 hover:bg-purple-600" }, // Algebra
    { id: 4, icon: <FaFlask />, styles: "bg-red-500 text-red-100 hover:bg-red-600" },          // Science
    { id: 5, icon: <FaLanguage />, styles: "bg-yellow-500 text-yellow-100 hover:bg-yellow-600" },  // Languages
    { id: 6, icon: <FaBookOpen />, styles: "bg-indigo-500 text-indigo-100 hover:bg-indigo-600" },  // Literature
    { id: 7, icon: <FaPaintBrush />, styles: "bg-pink-500 text-pink-100 hover:bg-pink-600" },   // Art
    { id: 8, icon: <FaGlobeAmericas />, styles: "bg-teal-500 text-teal-100 hover:bg-teal-600" }, // Social Studies
    { id: 9, icon: <FaTheaterMasks />, styles: "bg-orange-500 text-orange-100 hover:bg-orange-600" }, // Drama
    { id: 10, icon: <FaDumbbell />, styles: "bg-lime-500 text-lime-100 hover:bg-lime-600" },   // Physical Education
    { id: 11, icon: <FaRobot />, styles: "bg-gray-500 text-gray-100 hover:bg-gray-600" },     // Robotics
    { id: 12, icon: <FaChalkboardTeacher />, styles: "bg-amber-500 text-amber-100 hover:bg-amber-600" }, // Pedagogy
    { id: 13, icon: <FaLaptopCode />, styles: "bg-cyan-500 text-cyan-100 hover:bg-cyan-600" },  // Programming
    { id: 14, icon: <FaMusic />, styles: "bg-fuchsia-500 text-fuchsia-100 hover:bg-fuchsia-600" }, // Music
    { id: 15, icon: <FaLeaf />, styles: "bg-emerald-500 text-emerald-100 hover:bg-emerald-600" }, // Environmental Science
    { id: 16, icon: <FaAtom />, styles: "bg-sky-500 text-sky-100 hover:bg-sky-600" }         // Physics
  ];
  

const GradesForTutorPage = () => {
  const student = mockStudents[0];
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);

  const toggleSubject = (subject: string) => {
    setExpandedSubject(expandedSubject === subject ? null : subject);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-900 min-h-screen text-white"
    >
      <h1 className="text-2xl font-bold mb-6">Notas de {student.first_name} {student.last_name}</h1>
      
      {Object.keys(student.grades).map((subject, index) => {
        const subjectStyle = assignatureStyles[index % assignatureStyles.length]; 
        const averageGrade = gradeScale[student.grades[subject]]; 

        return (
          <motion.div 
            key={subject}
            className={`p-5 rounded-lg shadow-lg mb-4 transition-all ${subjectStyle.styles}`}
            whileHover={{ scale: 1.02 }}
          >
            {/* Header Section */}
            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSubject(subject)}>
              <div className="flex items-center gap-4">
                <div className="text-3xl">{subjectStyle.icon}</div>
                <div>
                  <h2 className="text-lg font-semibold">{subject}</h2>
                  <p className="text-sm text-gray-200">Promedio: 
                    <span className={`font-bold ml-2 `}>{averageGrade}</span>
                  </p>
                </div>
              </div>
              
              <motion.div animate={{ rotate: expandedSubject === subject ? 180 : 0 }}>
                <FaChevronDown className="text-xl" />
              </motion.div>
            </div>

            {/* Expandable Assignments List */}
            {expandedSubject === subject && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg border-l-4 my-6"
              >
                <ul>
                  {student.activities[subject].map(activity => (
                        <li key={activity.id} className="flex justify-between border-b border-gray-700 py-2">
                            <div className="flex flex-col">
                                <p className="text-lg font-bold mb-2">{activity.name}</p>
                                <p className="text-gray-600 dark:text-gray-400">Descripción: {activity.description}</p>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Observaciones: {activity.observation}</p>
                                    <p className="text-sm text-gray-500 mt-2">
                                    📅 Fecha de entrega: {moment(activity.due_date).format("DD/MM/YYYY")}
                                </p>
                            </div>
                            
                            <span className={`font-semibold ${
                                gradeScale[activity.grade] === 'C' ? 'text-red-600'
                                : gradeScale[activity.grade] === 'B' ? 'text-yellow-500'
                                : gradeScale[activity.grade] === 'A' ? 'text-blue-400'
                                : 'text-green-400'
                            }`}>
                                {gradeScale[activity.grade]}
                            </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default GradesForTutorPage;
