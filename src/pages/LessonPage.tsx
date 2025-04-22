import { motion } from "framer-motion";
import { BookOpen, ClipboardList, FilePenLine, FileText, FlaskConical } from "lucide-react";
import Markdown from "react-markdown";
import { useLocation } from "react-router-dom"
import GoBack from "../components/ui/GoBack";
  
  const iconMap = [
    { name: 'Tarea', icon: FileText, color: 'blue-500' },
    { name: 'Ejercicios', icon: ClipboardList, color: 'green-500' },
    { name: 'Evaluación', icon: FilePenLine, color: 'red-500' },
    { name: 'Examen', icon: BookOpen, color: 'yellow-500' },
    { name: 'Proyecto', icon: FlaskConical, color: 'purple-500' },
  ];

const LessonPage = () => {

    const lesson = useLocation().state.lesson

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-6"
        >
            <GoBack 
                path={`/app/assignatures/${lesson.assignature}`}
                state={{ area: lesson.area, assignatureId: lesson.assignature, classroom: lesson.clase }}
            />
            <h1 
                className="text-3xl font-bold mb-4 text-slate-800 dark:text-white"
            >
                {lesson.subject.toLowerCase().split(' ').map(function(word: string) {
                    return word.charAt(0).toUpperCase() + word.slice(1);
                }).join(' ')}
            </h1>
        </motion.div>

        <motion.div 
            className="prose dark:prose-invert max-w-none mb-10 h-40 overflow-scroll bg-slate-100 dark:bg-slate-800 rounded-2xl px-6 py-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
        >
            <Markdown>{lesson.content}</Markdown>

        </motion.div>

        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
            visible: {
                transition: {
                staggerChildren: 0.1,
                },
            },
            }}
        >
            <h2 className="text-2xl mb-6 text-center font-semibold">Actividades</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {iconMap.map(({ name, icon: Icon, color }) => (
                <motion.button
                    key={name}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl shadow-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition text-${color} shadow-xl shadow-slate-500`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Icon className="w-6 h-6 mb-2" />
                    <span className="text-slate-50 text-sm font-medium">{name}</span>
                </motion.button>
                ))}
            </div>

        </motion.div>
    </div>
  )
}

export default LessonPage