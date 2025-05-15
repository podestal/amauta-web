import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { StudentByTotalScore } from "../services/api/studentsService";

interface Activity {
  id: number;
  title: string;
  date: string;
  grade: 'C' | 'B' | 'A' | 'AD';
}

const dummyActivities: Activity[] = [
  { id: 1, title: 'Matemáticas - Examen 1', date: '2025-04-10', grade: 'B' },
  { id: 2, title: 'Historia - Proyecto', date: '2025-04-17', grade: 'A' },
  { id: 3, title: 'Ciencias - Práctica', date: '2025-04-25', grade: 'AD' },
  { id: 4, title: 'Inglés - Tarea', date: '2025-05-03', grade: 'B' },
  { id: 5, title: 'Educación Física - Prueba', date: '2025-05-10', grade: 'A' },
];

const gradeColors: Record<string, string> = {
  'C': 'bg-red-500 text-white',
  'B': 'bg-yellow-500 text-white',
  'A': 'bg-blue-500 text-white',
  'AD': 'bg-green-600 text-white',
};

const RankingStudentInfo = () => {
  const navigate = useNavigate();
  const state = useLocation().state;
  const student: StudentByTotalScore = state?.student;

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
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-6 hover:underline"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        Volver al Ranking
      </button>

      {/* Student Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center text-2xl font-bold">
          {student.first_name.split(' ').map((n) => n[0]).join('').toLocaleUpperCase()}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{student.first_name} {student.last_name}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Promedio actual: 
            <span className={`ml-2 px-2 py-0.5 rounded-full ${gradeColors[student.average_alphabetical]}`}>
              {student.average_alphabetical}
            </span>
          </p>
        </div>
      </div>

      {/* Performance Graph Placeholder */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Evolución Académica</h2>
        <div className="w-full h-48 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
          {/* Replace this div with a real chart library later */}
          <p>📊 Gráfica de rendimiento (evolución de notas)</p>
        </div>
      </div>

      {/* Activities List */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Actividades Recientes</h2>
        <div className="space-y-4">
          {dummyActivities.map((activity) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: activity.id * 0.05 }}
              className="flex justify-between items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-4 py-3 shadow-sm"
            >
              <div>
                <p className="text-md font-medium text-gray-900 dark:text-gray-100">{activity.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{activity.date}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-semibold ${gradeColors[activity.grade]}`}>
                {activity.grade}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

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
