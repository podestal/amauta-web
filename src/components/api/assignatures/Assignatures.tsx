import { FaShapes, FaCalculator, FaSuperscript } from "react-icons/fa";
import AssignatureCard from "./AssignatureCard";

export interface Assignature {
    id: number;
    name: string;
    icon: JSX.Element;
    color: string;
    textColor: string;
    hoverColor: string;
}

const assignatures = [
  { id: 1, name: "Geometría", icon: <FaShapes />, color: "bg-blue-500", textColor: "text-blue-100", hoverColor: "hover:bg-blue-600" },
  { id: 2, name: "Aritmética", icon: <FaCalculator />, color: "bg-green-500", textColor: "text-green-100", hoverColor: "hover:bg-green-600" },
  { id: 3, name: "Álgebra", icon: <FaSuperscript />, color: "bg-purple-500", textColor: "text-purple-100", hoverColor: "hover:bg-purple-600" },
];

const Assignatures = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-gray-200 mb-10">
        📚 Asignaturas
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {assignatures.map((assignature) => (
            <AssignatureCard 
                key={assignature.id}
                assignature={assignature}
            />
        ))}
      </div>
    </div>
  );
};

export default Assignatures;
