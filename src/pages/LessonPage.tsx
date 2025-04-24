import { motion } from "framer-motion";
import { ClipboardList, FilePenLine, FileText, FlaskConical } from "lucide-react";
import Markdown from "react-markdown";
import { useLocation } from "react-router-dom"
import GoBack from "../components/ui/GoBack";
import { useEffect, useState } from "react";
import getTitleCase from "../utils/getTitleCase";
import Modal from "../components/ui/Modal";
import { Lesson } from "../services/api/lessonService";
// import getAIResponse from "../utils/getAiResponse";
import ActivityAIResponse from "../components/api/activity/ActivityAIResponse";
import ActivityAIFormHomework from "../components/api/activity/forms/ActivityAIFormHomework";
import ActivityAIFormClassActivity from "../components/api/activity/forms/ActivityAIFormClassActivity";
import ActivityAIFormTest from "../components/api/activity/forms/ActivityAIFormTest";
import ActivityAIFormProject from "../components/api/activity/forms/ActivityAIFormProject";
import getAgeFromClassroom from "../utils/getAgeFromClassroom";
  
  const iconMap = [
    { name: 'Tarea', icon: FileText, color: 'blue-500' },
    { name: 'Trabajo en clase', icon: ClipboardList, color: 'green-500' },
    { name: 'Evaluación', icon: FilePenLine, color: 'red-500' },
    // { name: 'Examen', icon: BookOpen, color: 'yellow-500' },
    { name: 'Proyecto', icon: FlaskConical, color: 'yellow-500' },
  ];

const LessonPage = () => {

    const lesson: Lesson = useLocation().state.lesson
    const classroom: string = useLocation().state.classroom
    const [category, setCategory] = useState('')
    
    const [open, setOpen] = useState(false)
    const [markdown, setMarkdown] = useState('')
    const [loading, setLoading] = useState(true)
    const age = getAgeFromClassroom(classroom)

    console.log('loading', loading);
    
    

    useEffect(() => {
        if (markdown) {
            setLoading(false)
        }
    }, [markdown])

  return (
    <>
        <div className="max-w-5xl mx-auto px-4 py-6">
        <>{console.log('category', category)}</>
        {/* <>{console.log('markdown', lesson.content)}</> */}
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-6"
        >
            <GoBack 
                path={`/app/assignatures/${lesson.assignature}`}
                state={{ }}
            />
            <h1 
                className="text-3xl font-bold mb-4 text-slate-800 dark:text-white"
            >
                {getTitleCase(lesson.subject)}
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {iconMap.map(({ name, icon: Icon, color }) => (
                <motion.button
                    key={name}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl shadow-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition text-${color} shadow-xl shadow-slate-500`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        setOpen(true);
                        setCategory(name.toLocaleLowerCase());
                    }}
                >
                    <Icon className="w-6 h-6 mb-2" />
                    <span className="text-slate-50 text-sm font-medium">{name}</span>
                </motion.button>
                ))}
            </div>

        </motion.div>
    </div>
    <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        whole
    >
        {markdown 
        ? 
        <ActivityAIResponse 
            markdown={markdown}
            setMarkdown={setMarkdown}
        /> 
        : 
        <>
        {category === 'tarea' && <ActivityAIFormHomework lesson={lesson} age={age} markdown={markdown} setMarkdown={setMarkdown}/>}
        {category === 'trabajo en clase' && <ActivityAIFormClassActivity lesson={lesson} age={age} markdown={markdown} setMarkdown={setMarkdown} />}
        {category === 'evaluación' && <ActivityAIFormTest lesson={lesson} age={age} markdown={markdown} setMarkdown={setMarkdown} />}
        {category === 'proyecto' && <ActivityAIFormProject />}

        </>}
    </Modal>
    </>
  )
}

export default LessonPage