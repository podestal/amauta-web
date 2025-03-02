import { AnimatePresence, motion } from "framer-motion"
import { AssignatureByTutor } from "../../../services/api/assignatureService"
import { FaBookOpen, FaCalculator, FaChevronDown, FaFlask, FaLanguage, FaPaintBrush, FaShapes, FaSuperscript, FaGlobeAmericas, FaTheaterMasks, FaDumbbell, FaRobot, FaChalkboardTeacher, FaLaptopCode, FaMusic, FaLeaf, FaAtom } from "react-icons/fa";
import { useState } from "react";
import ActivitiesByTutor from "../activity/ActivitiesByTutor";

interface Props {
    assignature: AssignatureByTutor
    studentUid: string
    index: number
    quarter: string
}

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

const AssignatureCardByTutor = ({ assignature, studentUid, index, quarter }: Props) => {

    const [show, setShow] = useState(false);
    

  return (
        <motion.div 
            key={assignature.id}
            className={`p-5 rounded-lg shadow-lg mb-4 transition-all ${assignatureStyles[index % assignatureStyles.length].styles}`}
            whileHover={{ scale: 1.02 }}
        >
            <div className="flex justify-between items-center cursor-pointer" onClick={() => setShow(!show)}>
                <div className="flex items-center gap-4">
                <div className="text-3xl">{assignatureStyles[index % assignatureStyles.length].icon}</div>
                <div>
                    <h2 className="text-lg font-semibold">{assignature.title}</h2>
                    <p className="text-sm text-gray-200">Promedio: 
                    <span className={`font-bold ml-2 `}>{assignature.average}</span>
                    </p>
                </div>
                </div>
                
                <motion.div animate={{ rotate: show ? 0 : 180 }}>
                    <FaChevronDown className="text-xl" />
                </motion.div>
            </div>
            
            <AnimatePresence>
            {show && 
                <ActivitiesByTutor 
                    assignatureId={(assignature.id).toString()} 
                    studentUid={studentUid}
                    show={show}
                    quarter={quarter}
            />}
            </AnimatePresence>
        </motion.div>
  )
}

export default AssignatureCardByTutor