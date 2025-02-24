import { motion } from "framer-motion";
import { useState } from "react";
import { RiArrowDownSFill } from "@remixicon/react";
import { useNavigate } from "react-router-dom";
import useLanguageStore from "../hooks/store/useLanguageStore";
import Button from "../components/ui/Button";
import { CheckCircle, AlertTriangle, BookOpen } from "lucide-react";

// Sample Grade Data
interface Grade {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  score?: number; // Optional score, null means not graded yet
}

const grades: Grade[] = [
  {
    id: 1,
    name: "Math Assignment",
    description: "Solve the first 10 problems from the book",
    dueDate: "2021-09-30",
    score: 85,
  },
  {
    id: 2,
    name: "Science Project",
    description: "Create a volcano model",
    dueDate: "2021-10-15",
    score: 60,
  },
  {
    id: 3,
    name: "History Quiz",
    description: "Answer the questions from the chapter",
    dueDate: "2021-10-20",
    score: 95,
  },
  {
    id: 4,
    name: "English Essay",
    description: "Write a 500-word essay on your favorite book",
    dueDate: "2021-10-30",
  },
];

const GradesSummaryTutorPage = () => {

    const studentName = "John Doe";
    const lan = useLanguageStore(s => s.lan);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const toggleDetails = () => setShow(!show);

  return (
    <motion.div
      className="w-full bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-2xl shadow-lg text-white mb-6"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold mb-2">{studentName}</h2>
          <p className="text-gray-400 text-sm">{lan === "EN" ? "Grades Overview" : "Resumen de Notas"}</p>
        </div>

        {/* Toggle Button */}
        <motion.div
          className="cursor-pointer p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition"
          onClick={toggleDetails}
          animate={{ rotate: show ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <RiArrowDownSFill size={24} />
        </motion.div>
      </div>

      {/* Expandable Section */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: show ? "auto" : 0, opacity: show ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="mt-4 p-4 bg-gray-800 rounded-lg shadow-md">
          {/* List of Grades */}
          <ul className="divide-y divide-gray-700">
            {grades.map((grade) => (
              <li key={grade.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold">{grade.name}</p>
                  <p className="text-gray-400 text-sm">{grade.description}</p>
                  <p className="text-gray-300 text-xs">📅 {grade.dueDate}</p>
                </div>

                {/* Grade Status Icon */}
                {grade.score !== undefined ? (
                  grade.score >= 70 ? (
                    <CheckCircle className="text-green-500 w-6 h-6" xlinkTitle="Approved" />
                  ) : (
                    <AlertTriangle className="text-yellow-500 w-6 h-6" xlinkTitle="Needs Improvement" />
                  )
                ) : (
                  <BookOpen className="text-blue-500 w-6 h-6" xlinkTitle="Not Graded Yet" />
                )}
              </li>
            ))}
          </ul>

          {/* Action Button */}
          <div className="mt-6 flex justify-center">
            <Button
              onClick={() => navigate(`/app/grades`)}
              label={lan === "EN" ? "View All Grades" : "Ver Todas las Notas"}
              className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 transition rounded-md shadow-md"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GradesSummaryTutorPage;
