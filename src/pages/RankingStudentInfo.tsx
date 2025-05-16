import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { StudentByTotalScore } from "../services/api/studentsService";
import getCurrentQuarter from "../utils/getCurrentCuarter";
import RankingStudentActivities from "../components/api/ranking/singleStudent/RankingStudentActivities";
import SingleStudentHeader from "../components/api/ranking/singleStudent/SingleStudentHeader";
import SingleStudentBody from "../components/api/ranking/singleStudent/SingleStudentBody";

const RankingStudentInfo = () => {
    const state = useLocation().state;
    const student: StudentByTotalScore = state?.student;
    const quarter: string = state?.quarter || getCurrentQuarter();

    if (!student) {
        return <div>No student data</div>;
    }

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1380px] mx-auto py-10"
    >
      <SingleStudentHeader 
        student={student} 
      />

      {/* Performance Graph Placeholder */}
      {/* <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Evolución Académica</h2>
        <div className="w-full h-48 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">

          <p>📊 Gráfica de rendimiento (evolución de notas)</p>
        </div>
      </div> */}

      {/* Activities List */}
        <SingleStudentBody 
          student={student}
          quarter={quarter}
        />

      {/* Stats Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Resumen</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-4 text-center">
            <p className="text-2xl font-bold text-green-500">85%</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Tareas Completadas</p>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-4 text-center">
            <p className="text-2xl font-bold text-blue-500">+2</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Subió de nivel</p>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-4 text-center">
            <p className="text-2xl font-bold text-red-500">1</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Área a mejorar</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RankingStudentInfo;
