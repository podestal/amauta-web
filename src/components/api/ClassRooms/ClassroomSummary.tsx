import { motion } from "framer-motion";
import { School, Users } from "lucide-react";
import { Classroom } from "../../../services/api/classroomService";
import getClassroomDescription from "../../../utils/getClassroomDescription";
import { useNavigate } from "react-router-dom";

interface Props {
  classrooms: Classroom[];
}

const ClassroomSummary = ({ classrooms }: Props) => {

  const navigate = useNavigate()
  const secondary = classrooms.filter((classroom) => classroom.level === 'S') 
  const primary = classrooms.filter((classroom) => classroom.level === 'P')
  const initial = classrooms.filter((classroom) => classroom.level === 'I')

  const totalStudents = classrooms.reduce((acc, classroom) => acc + classroom.total_students, 0)


  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6 dark:text-white">Alumnos matriculados: {totalStudents}</h2>
      <div className="w-full flex flex-col items-center justify-center gap-8 mt-10">
        <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">📚 Secundaria</h2>
        <div className="w-full grid gap-6 xl:grid-cols-4">
          {secondary.map((classroom) => (
            <motion.div
              key={classroom.id}
              onClick={() => navigate(`subscribed/${classroom.id}` , {state: {classrooms} })}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className={`cursor-pointer relative bg-slate-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600 shadow-lg rounded-xl p-6 flex flex-col items-center justify-center border ${classroom.missing_dni ? 'border-red-500' : 'border-gray-700'}`}
            >

              <School className="text-blue-500 dark:text-blue-400 w-12 h-12 mb-4" />
              {classroom.missing_dni > 0 && <p className="absolute top-0 left-0 rounded-3xl bg-red-500 text-xs px-2">Faltan {classroom.missing_dni} DNIs</p>}
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{getClassroomDescription({lan: 'ES', grade: classroom.grade, section: classroom.section, level: classroom.level, noLevel:true })}</h3>
              
              <div className="flex items-center mt-2 text-gray-600 dark:text-gray-300">
                <Users className={`w-5 h-5 mr-2 ${classroom.missing_dni ? 'text-red-500' : 'text-green-500'}`} />
                <p className="text-lg font-medium">{classroom.total_students} estudiantes</p>
              </div>
            </motion.div>
          ))}
        </div>
        <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">📚 Primaria</h2>
        <div className="w-full grid gap-6 xl:grid-cols-4">
          {primary.map((classroom) => (
            <motion.div
              key={classroom.id}
              onClick={() => navigate(`subscribed/${classroom.id}` , {state: {classrooms} })}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className={`cursor-pointer relative bg-slate-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600 shadow-lg rounded-xl p-6 flex flex-col items-center justify-center border ${classroom.missing_dni ? 'border-red-500' : 'border-gray-700'}`}
            >

              <School className="text-blue-500 dark:text-blue-400 w-12 h-12 mb-4" />
              {classroom.missing_dni > 0 && <p className="absolute top-0 left-0 rounded-3xl bg-red-500 text-xs px-2">Faltan {classroom.missing_dni} DNIs</p>}
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{getClassroomDescription({lan: 'ES', grade: classroom.grade, section: classroom.section, level: classroom.level, noLevel:true })}</h3>
              
              <div className="flex items-center mt-2 text-gray-600 dark:text-gray-300">
                <Users className={`w-5 h-5 mr-2 ${classroom.missing_dni ? 'text-red-500' : 'text-green-500'}`} />
                <p className="text-lg font-medium">{classroom.total_students} estudiantes</p>
              </div>
            </motion.div>
          ))}
        </div>
        <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">📚 Inicial</h2>
        <div className="w-full grid gap-6 xl:grid-cols-4">
          {initial.map((classroom) => (
            <motion.div
              key={classroom.id}
              onClick={() => navigate(`subscribed/${classroom.id}`, {state: {classrooms} })}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className={`cursor-pointer relative bg-slate-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600 shadow-lg rounded-xl p-6 flex flex-col items-center justify-center border ${classroom.missing_dni ? 'border-red-500' : 'border-gray-700'}`}
            >

              <School className="text-blue-500 dark:text-blue-400 w-12 h-12 mb-4" />
              {classroom.missing_dni > 0 && <p className="absolute top-0 left-0 rounded-3xl bg-red-500 text-xs px-2">Faltan {classroom.missing_dni} DNIs</p>}
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{getClassroomDescription({lan: 'ES', grade: classroom.grade, section: classroom.section, level: classroom.level, noLevel:true })}</h3>
              
              <div className="flex items-center mt-2 text-gray-600 dark:text-gray-300">
                <Users className={`w-5 h-5 mr-2 ${classroom.missing_dni ? 'text-red-500' : 'text-green-500'}`} />
                <p className="text-lg font-medium">{classroom.total_students} estudiantes</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassroomSummary;
