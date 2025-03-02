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
import { useLocation } from "react-router-dom";
import { AssignatureByTutor } from "../services/api/assignatureService";
import AssignatureCardByTutor from "../components/api/assignatures/AssignatureCardByTutor";

const gradeScale: Record<number, string> = {
  1: "C", // Lowest
  2: "B",
  3: "A",
  4: "AD", // Highest
};

// Define styles and icons for each subject
  

const GradesForTutorPage = () => {

  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);
  const student = useLocation().state.student
  const assignatures: AssignatureByTutor[] = useLocation().state.assignatures

  console.log('assignatures', assignatures);
  

  const toggleSubject = (subject: string) => {
    setExpandedSubject(expandedSubject === subject ? null : subject);
  };

  return (
    // <motion.div 
      // initial={{ opacity: 0, y: -10 }}
      // animate={{ opacity: 1, y: 0 }}
      // transition={{ duration: 0.5 }}
      // className="p-6 bg-gray-900 min-h-screen text-white"
    // >
    //   <h1 className="text-2xl font-bold mb-6">Notas de {student.first_name} {student.last_name}</h1>
      
    //   {Object.keys(student.grades).map((subject, index) => {
    //     const subjectStyle = assignatureStyles[index % assignatureStyles.length]; 
    //     const averageGrade = gradeScale[student.grades[subject]]; 

    //     return (
          // <motion.div 
          //   key={subject}
          //   className={`p-5 rounded-lg shadow-lg mb-4 transition-all ${subjectStyle.styles}`}
          //   whileHover={{ scale: 1.02 }}
          // >
    //         {/* Header Section */}
            // <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSubject(subject)}>
            //   <div className="flex items-center gap-4">
            //     <div className="text-3xl">{subjectStyle.icon}</div>
            //     <div>
            //       <h2 className="text-lg font-semibold">{subject}</h2>
            //       <p className="text-sm text-gray-200">Promedio: 
            //         <span className={`font-bold ml-2 `}>{averageGrade}</span>
            //       </p>
            //     </div>
            //   </div>
              
            //   <motion.div animate={{ rotate: expandedSubject === subject ? 180 : 0 }}>
            //     <FaChevronDown className="text-xl" />
            //   </motion.div>
            // </div>

    //         {/* Expandable Assignments List */}
    //         {expandedSubject === subject && (
    //           <motion.div
    //             initial={{ height: 0, opacity: 0 }}
    //             animate={{ height: "auto", opacity: 1 }}
    //             transition={{ duration: 0.4 }}
    //             className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg border-l-4 my-6"
    //           >
    //             <ul>
    //               {student.activities[subject].map(activity => (
    //                     <li key={activity.id} className="flex justify-between border-b border-gray-700 py-2">
    //                         <div className="flex flex-col">
    //                             <p className="text-lg font-bold mb-2">{activity.name}</p>
    //                             <p className="text-gray-600 dark:text-gray-400">Descripción: {activity.description}</p>
    //                             <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Observaciones: {activity.observation}</p>
    //                                 <p className="text-sm text-gray-500 mt-2">
    //                                 📅 Fecha de entrega: {moment(activity.due_date).format("DD/MM/YYYY")}
    //                             </p>
    //                         </div>
                            
    //                         <span className={`font-semibold ${
    //                             gradeScale[activity.grade] === 'C' ? 'text-red-600'
    //                             : gradeScale[activity.grade] === 'B' ? 'text-yellow-500'
    //                             : gradeScale[activity.grade] === 'A' ? 'text-blue-400'
    //                             : 'text-green-400'
    //                         }`}>
    //                             {gradeScale[activity.grade]}
    //                         </span>
    //                 </li>
    //               ))}
    //             </ul>
    //           </motion.div>
    //         )}
    //       </motion.div>
    //     );
    //   })}
    // </motion.div>
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-900 min-h-screen text-white"
    >
       <h1 className="text-2xl font-bold mb-6">Notas de {student.first_name} {student.last_name}</h1>
       {assignatures.map((assignature, index) => (
          <AssignatureCardByTutor 
            key={assignature.id} 
            assignature={assignature} 
            index={index}
          />
       ))}
    </motion.div>
  );
};

export default GradesForTutorPage;
