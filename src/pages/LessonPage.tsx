import { motion } from "framer-motion";
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
import Button from "../components/ui/Button";
import ActivityForm from "../components/api/activity/ActivityForm";
import useCreateActivity from "../hooks/api/activity/useCreateActivity";
import getCurrentQuarter from "../utils/getCurrentCuarter";
import ActivitiesList from "../components/api/activity/ActivitiesList";
import CategoryAISelector from "../components/api/category/CategoryAISelector";
import { ClipboardList, FilePenLine, FileText, FlaskConical } from "lucide-react";

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
    const assignature: string = useLocation().state.assignature
    const area: string = useLocation().state.area
    const [category, setCategory] = useState('')
    
    const [open, setOpen] = useState(false)
    const [markdown, setMarkdown] = useState('')
    const [loading, setLoading] = useState(true)
    const [activityForm, setActivityForm] = useState(false)
    const [titleAI, setTitleAI] = useState('')
    const age = getAgeFromClassroom(classroom)

    console.log('loading', loading);

    const quarter = getCurrentQuarter()
    const createActivity = useCreateActivity({ assignatureId: assignature, quarter, lessonId: lesson.id })
    
    

    useEffect(() => {
        if (markdown) {
            setLoading(false)
        }
    }, [markdown])

  return (
    <>
        <div className="max-w-5xl mx-auto px-4 py-6">
        {/* <>{console.log('markdown', lesson.content)}</> */}
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-6"
        >
            <GoBack 
                path={`/app/assignatures/${lesson.assignature}`}
                state={{ assignature, classroom, area }}
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

        <CategoryAISelector 
            markdown={markdown}
            category={category}
            setCategory={setCategory}
            setOpen={setOpen}
            iconMap={iconMap}
            lesson={true}
        />
    </div>
    <h2 className="text-2xl my-6 text-center font-semibold">Actividades</h2>
    {activityForm 
    ? 
    <Modal
        isOpen={activityForm}
        onClose={() => {
            setActivityForm(false)
            setMarkdown('')
            setCategory('')
            setOpen(false)
        }}
        whole
    >
        <ActivityForm 
            area={parseInt(area)}
            assignatureId={assignature}
            descriptionAI={markdown}
            categoryAI={category}
            titleAI={titleAI ? titleAI : `${getTitleCase(lesson.subject)} de ${getTitleCase(category)}`}
            createActivity={createActivity}
            lesson={[lesson.id]}
            setOpen={setActivityForm}
            setAIPromptOpen={setOpen}
        />
    </Modal>
    : 
    <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        whole
    >
        {markdown 
        ? 
        
        <>
        <div className="flex justify-center items-center my-8 gap-12">
            <Button 
                label="Guardar"
                onClick={() => {
                    setActivityForm(true)
                }}
            />
            <Button 
                label="Descartar"
                color="red"
                onClick={() => {
                    setMarkdown('')
                    setCategory('')
                    setOpen(false)
                    // localStorage.removeItem(`markdown-${lesson.id}-${category}`)
                }}
            />
        </div>
        <ActivityAIResponse 
            markdown={markdown}
            setMarkdown={setMarkdown}
        />
        </> 
        : 
        <>
        {category === 'tarea' && <ActivityAIFormHomework lessons={[lesson]} age={age} markdown={markdown} setMarkdown={setMarkdown} setAITitle={setTitleAI}/>}
        {category === 'trabajo en clase' && <ActivityAIFormClassActivity lesson={lesson} age={age} markdown={markdown} setMarkdown={setMarkdown} setAITitle={setTitleAI}/>}
        {category === 'evaluación' && <ActivityAIFormTest lesson={lesson} age={age} markdown={markdown} setMarkdown={setMarkdown} setAITitle={setTitleAI}/>}
        {category === 'proyecto' && <ActivityAIFormProject lesson={lesson} age={age} markdown={markdown} setMarkdown={setMarkdown} setAITitle={setTitleAI}/>}

        </>}
    </Modal>}
    <div className="w-full max-w-3xl mx-auto px-6 py-8">
        <ActivitiesList 
            assignatureId={assignature} 
            quarter={getCurrentQuarter()} 
            area={area} 
            classroom={classroom.split('-')[classroom.split('-').length - 1]} 
            lessonId={lesson.id}   
            descriptionAi
        />
    </div>

    </>
  )
}

export default LessonPage