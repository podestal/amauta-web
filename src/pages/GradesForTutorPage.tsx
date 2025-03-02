import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { AssignatureByTutor } from "../services/api/assignatureService";
import AssignatureCardByTutor from "../components/api/assignatures/AssignatureCardByTutor";
  

const GradesForTutorPage = () => {

  const student = useLocation().state.student
  const assignatures: AssignatureByTutor[] = useLocation().state.assignatures
  const quarter = useLocation().state.quarter
  

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-900 min-h-screen text-white overflow-scroll pb-20"
    >
       <h1 className="text-2xl text-center font-bold mb-6">Notas de {student.first_name} {student.last_name}</h1>
       {assignatures.map((assignature, index) => (
          <AssignatureCardByTutor 
            key={assignature.id} 
            assignature={assignature} 
            studentUid={student.uid}
            index={index}
            quarter={quarter}
          />
       ))}
    </motion.div>
  );
};

export default GradesForTutorPage;
