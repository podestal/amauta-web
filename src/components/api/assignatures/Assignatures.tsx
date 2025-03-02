import { FaShapes, FaCalculator, FaSuperscript } from "react-icons/fa";
import AssignatureCard from "./AssignatureCard";
import { motion } from "framer-motion";
import useAuthStore from "../../../hooks/store/useAuthStore";
import useGetAssignature from "../../../hooks/api/assignature/useGetAssignature";

export interface Assignature {
    id: number;
    name: string;
    area: number
    icon: JSX.Element;
    color: string;
    textColor: string;
    hoverColor: string;
}

export const assignatures = [
  { id: 1, name: "Geometría", area: 9, icon: <FaShapes />, color: "bg-blue-500", textColor: "text-blue-100", hoverColor: "hover:bg-blue-600" },
  { id: 2, name: "Aritmética", area: 9, icon: <FaCalculator />, color: "bg-green-500", textColor: "text-green-100", hoverColor: "hover:bg-green-600" },
  { id: 3, name: "Álgebra", area: 9, icon: <FaSuperscript />, color: "bg-purple-500", textColor: "text-purple-100", hoverColor: "hover:bg-purple-600" },
];

const assignatureStyle = [
  {
    id:1,
    icon: <FaShapes />,
    styles: "bg-blue-500 text-blue-100 hover:bg-blue-600"
  },
  {
    id:2,
    icon: <FaCalculator />,
    styles: "bg-green-500 text-green-100 hover:bg-green-600"
  },
  {
    id:3,
    icon: <FaSuperscript />,
    styles: "bg-purple-500 text-purple-100 hover:bg-purple-600"
  },
  {
    id:4,
    icon: <FaShapes />,
    styles: "bg-blue-500 text-blue-100 hover:bg-blue-600"
  },
  {
    id:5,
    icon: <FaCalculator />,
    styles: "bg-green-500 text-green-100 hover:bg-green-600"
  },
  {
    id:6,
    icon: <FaSuperscript />,
    styles: "bg-purple-500 text-purple-100 hover:bg-purple-600"
  },
  {
    id:7,
    icon: <FaShapes />,
    styles: "bg-blue-500 text-blue-100 hover:bg-blue-600"
  },
  {
    id:8,
    icon: <FaCalculator />,
    styles: "bg-green-500 text-green-100 hover:bg-green-600"
  },
  {
    id:9,
    icon: <FaSuperscript />,
    styles: "bg-purple-500 text-purple-100 hover:bg-purple-600"
  },
  {
    id:10,
    icon: <FaShapes />,
    styles: "bg-blue-500 text-blue-100 hover:bg-blue-600"
  },
  {
    id:11,
    icon: <FaCalculator />,
    styles: "bg-green-500 text-green-100 hover:bg-green-600"
  },
  {
    id:12,
    icon: <FaSuperscript />,
    styles: "bg-purple-500 text-purple-100 hover:bg-purple-600"
  },
  {
    id:13,
    icon: <FaShapes />,
    styles: "bg-blue-500 text-blue-100 hover:bg-blue-600"
  },
  {
    id:14,
    icon: <FaCalculator />,
    styles: "bg-green-500 text-green-100 hover:bg-green-600"
  },
  {
    id:15,
    icon: <FaSuperscript />,
    styles: "bg-purple-500 text-purple-100 hover:bg-purple-600"
  },
  {
    id:16,
    icon: <FaShapes />,
    styles: "bg-blue-500 text-blue-100 hover:bg-blue-600"
  },
  {
    id:17,
    icon: <FaCalculator />,
    styles: "bg-green-500 text-green-100 hover:bg-green-600"
  },
]

const Assignatures = () => {

  const access = useAuthStore(s => s.access) || ''
  const { data: assignaturesWeb, isLoading, isError, error, isSuccess } = useGetAssignature({ access, byInstructor: true })

  if (isLoading) return <p className="animate-pulse text-2xl text-center py-20">Un Momento ...</p>

  if (isError) return <p>Error {error.message}</p>

  if (isSuccess)

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-12">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-gray-200 mb-10">
        📚 Asignaturas
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {assignaturesWeb.map((assignature, idx) => (
            <AssignatureCard 
                key={assignature.id}
                assignature={assignature}
                icon={assignatureStyle[idx].icon}
                styles={assignatureStyle[idx].styles}
                idx={idx}
            />
        ))}
      </div>
    </div>
  );
};

export default Assignatures;
