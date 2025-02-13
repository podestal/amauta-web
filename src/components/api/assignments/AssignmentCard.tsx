import { motion } from "framer-motion";
import { Assignment, competencies, capacities } from "../../../data/mockdataForGrades";
import { useNavigate } from "react-router-dom";

// {
//   "id": 79,
//   "title": "Traduce cantidades a expresiones numéricas",
//   "competence": 21
// },
// {
//   "id": 80,
//   "title": "Comunica su comprensión sobre los números y las operaciones",
//   "competence": 21
// },
// {
//   "id": 81,
//   "title": "Usa estrategias y procedimientos de estimación y cálculo",
//   "competence": 21
// },
// {
//   "id": 82,
//   "title": "Argumenta afirmaciones sobre las relaciones numéricas y las operaciones",
//   "competence": 21
// },
// {
//   "id": 83,
//   "title": "Traduce datos y condiciones a expresiones algebraicas",
//   "competence": 22
// },
// {
//   "id": 84,
//   "title": "Comunica su comprensión sobre las relaciones algebraicas",
//   "competence": 22
// },
// {
//   "id": 85,
//   "title": "Usa estrategias y procedimientos para encontrar reglas generales",
//   "competence": 22
// },
// {
//   "id": 86,
//   "title": "Argumenta afirmaciones sobre relaciones de cambio y equivalencia",
//   "competence": 22
// },
// {
//   "id": 91,
//   "title": "Modela objetos con formas geométricas y sus transformaciones",
//   "competence": 23
// },
// {
//   "id": 92,
//   "title": "Comunica su comprensión sobre las formas y relaciones geométricas",
//   "competence": 23
// },
// {
//   "id": 93,
//   "title": "Usa estrategias y procedimientos para orientarse en el espacio",
//   "competence": 23
// },
// {
//   "id": 94,
//   "title": "Argumenta afirmaciones sobre relaciones geométricas",
//   "competence": 23
// },
// {
//   "id": 87,
//   "title": "Representa datos con gráficos y medidas estadísticas o probabilísticas",
//   "competence": 24
// },
// {
//   "id": 88,
//   "title": "Comunica la comprensión de los conceptos estadísticos y probabilísticos",
//   "competence": 24
// },
// {
//   "id": 89,
//   "title": "Usa estrategias y procedimientos para recopilar y procesar datos",
//   "competence": 24
// },
// {
//   "id": 90,
//   "title": "Sustenta conclusiones o decisiones basado en información obtenida",
//   "competence": 24
// },

interface Props {
  assignment: Assignment;
}

const AssignmentCard = ({ assignment }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/app/grades/${assignment.id}`);
  };

  return (
    <motion.li
      key={assignment.id}
      onClick={handleClick}
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border-l-4 border-blue-500 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <h3 className="text-lg font-semibold">{assignment.name}</h3>
      <p className="text-gray-600 dark:text-gray-300">{assignment.description}</p>
      <p className="text-sm text-gray-500 mt-2">📅 Fecha de entrega: {assignment.dueDate}</p>

      {/* Competencies Tags */}
      {assignment.competencies && assignment.competencies.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {assignment.competencies.map((competenceId) => {
            const competence = competencies.find((c) => c.id === competenceId);
            return competence ? (
              <span
                key={competence.id}
                className="bg-blue-200 text-blue-800 text-xs font-medium px-3 py-1 rounded-full"
              >
                {competence.title}
              </span>
            ) : null;
          })}
        </div>
      )}
      
      {/* Capacities Tags */}
      {assignment.capacities && assignment.capacities.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {assignment.capacities.map((capacityId) => {
            const capacity = capacities.find((c) => c.id === capacityId);
            return capacity ? (
              <span
                key={capacity.id}
                className="bg-green-200 text-green-800 text-xs font-medium px-3 py-1 rounded-full"
              >
                {capacity.title}
              </span>
            ) : null;
          })}
        </div>
      )}
    </motion.li>
  );
};

export default AssignmentCard;
