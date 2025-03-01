import { useState } from "react";
import { motion } from "framer-motion";
import { students as initialStudents } from "../data/mockdataForGrades";
import { useLocation } from "react-router-dom";
import useNotificationsStore from "../hooks/store/useNotificationsStore";
import Grades from "../components/api/grade/Grades";

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

  const location = useLocation()
  const activity = location.state.activity
  // const [students, setStudents] = useState(initialStudents);
  // const assignment = useLocation().state.assignment
  // const { setMessage, setShow, setType } = useNotificationsStore()

  // Function to update the grade
  // const handleGradeChange = (id: number, newGrade: string) => {
  //   setStudents((prev) =>
  //     prev.map((student) =>
  //       student.id === id ? { ...student, grade: newGrade } : student
  //     )
  //   )
  //   setType('success')
  //   setShow(true)
  //   setMessage('Calificación asignada exitosamente!')
  // };


  return (
    <div className="w-full max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1380px] mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-2">📊 Calificaciones</h2>
      <p className="text-xl font-semibold text-center mb-6">{activity.title}</p>
      <Grades 
        activityId={activity.id}
      />
    </div>
    // <div className="w-full max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1380px] mx-auto px-6 py-12">
    //   <h2 className="text-3xl font-bold text-center mb-2">📊 Calificaciones</h2>
    //   <p className="text-xl font-semibold text-center mb-6">{assignment.name}</p>
      // <div className="overflow-x-auto max-lg:hidden">
      //   <motion.div
      //     className="w-full border-collapse bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden"
      //     initial={{ opacity: 0, y: 20 }}
      //     animate={{ opacity: 1, y: 0 }}
      //     transition={{ duration: 0.5 }}
      //   >
      //     {/* Table Header */}
      //     <div className="grid grid-cols-8 bg-gray-800 text-white font-bold min-h-14">
      //         <h2 className="flex items-center justify-left px-2">DNI</h2>
      //         <h2 className="flex items-center justify-left">Nombres</h2>
      //         <h2 className="flex items-center justify-left">Apellido</h2>
      //         <h2 className="flex items-center justify-center col-span-5">Calificación</h2>
      //     </div>

      //     {/* Table Body */}
      //     <div>
      //       {students
      //           .sort((a, b) => a.lastName.localeCompare(b.lastName))
      //           .map((student, index) => (
      //         <motion.div
      //           key={student.id}
      //           className="border-bborder-gray-700 hover:bg-gray-800 transition-colors grid grid-cols-8"
      //           initial={{ opacity: 0, y: 10 }}
      //           whileInView={{ opacity: 1, y: 0 }}
      //           viewport={{ once: true }}
      //           transition={{ duration: 0.3, delay: index * 0.05 }}
      //         >
      //           <h2 className="flex items-center justify-left px-2">{student.id}</h2>
      //           <h2 className="flex items-center justify-left">{student.lastName}</h2>
      //           <h2 className="flex items-center justify-left">{student.firstName}</h2>
      //           <div className="py-3 px-4 text-center col-span-5">
      //             <div className="w-full flex justify-evenly gap-2">
      //               {gradeOptions.map( grade => (
      //                 <>
      //                   <p 
      //                     onClick={() => handleGradeChange(student.id, grade)}
      //                     className={` w-16 rounded-3xl cursor-pointer hover:opacity-80 transition-all duration-300 ${grade === student.grade ? `${gradeStyles[student.grade]}` : 'bg-gray-300 text-gray-700'}`}>{grade}</p>
      //                 </>
      //               ))}
      //             </div>
      //           </div>
      //         </motion.div>
      //       ))}
      //     </div>
      //   </motion.div>
      // </div>
    //   <motion.div 
    //     initial={{ opacity: 0, y: 20 }}
    //     animate={{ opacity: 1, y: 0 }}
    //     transition={{ duration: 0.5 }}
    //     className="lg:hidden">
    //       <div>
    //         {students
    //           .sort((a, b) => a.lastName.localeCompare(b.lastName))
    //           .map((student, index) => (
    //           <motion.div
    //             key={student.id}
    //             className="flex flex-col gap-6 justify-between items-center bg-gray-800 p-3 rounded-lg shadow mb-4 hover:bg-gray-700 cursor-pointer"
    //             initial={{ opacity: 0, y: 10 }}
    //             animate={{ opacity: 1, y: 0 }}
    //             transition={{ duration: 0.5, delay: index * 0.05 }}
    //           >
    //             <div className="flex items-center">
    //               <h2 className="font-semibold text-xl">{student.lastName}, {student.firstName}</h2>
    //             </div>
    //             <div className="flex gap-2">
    //               {gradeOptions.map( grade => (
    //                 <>
    //                   <p 
    //                     onClick={() => handleGradeChange(student.id, grade)}
    //                     className={` w-16 py-2 text-center rounded-3xl cursor-pointer hover:opacity-80 transition-all duration-300 ${grade === student.grade ? `${gradeStyles[student.grade]}` : 'bg-gray-300 text-gray-700'}`}>{grade}</p>
    //                 </>
    //               ))}
    //             </div>
    //           </motion.div>
    //         ))}
    //       </div>
    //   </motion.div>
    // </div>
  );
};

export default GradesPage;
