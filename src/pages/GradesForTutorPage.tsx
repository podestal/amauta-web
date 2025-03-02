import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { AssignatureByTutor } from "../services/api/assignatureService";
import AssignatureCardByTutor from "../components/api/assignatures/AssignatureCardByTutor";
  

const GradesForTutorPage = () => {

  const student = useLocation().state.student
  const assignatures: AssignatureByTutor[] = useLocation().state.assignatures

  return (
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
            studentUid={student.uid}
            index={index}
          />
       ))}
    </motion.div>
  );
};

export default GradesForTutorPage;
