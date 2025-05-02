import { BookOpen, ClipboardList, FilePenLine, FileText, FlaskConical } from "lucide-react";
import { Lesson } from "../../../../services/api/lessonService"
import CategoryAISelector from "../../category/CategoryAISelector"
import { useState } from "react";
import ActivityAIFormProject from "./ActivityAIFormProject";
import ActivityAIFormTest from "./ActivityAIFormTest";
import ActivityAIFormClassActivity from "./ActivityAIFormClassActivity";
import ActivityAIFormHomework from "./ActivityAIFormHomework";
import { motion } from "framer-motion";
import ActivityAIResponse from "../ActivityAIResponse";
import Button from "../../../ui/Button";
import ActivityForm from "../ActivityForm";
import getTitleCase from "../../../../utils/getTitleCase";

const iconMap = [
    { name: 'Tarea', icon: FileText, color: 'blue-500' },
    { name: 'Trabajo en clase', icon: ClipboardList, color: 'green-500' },
    { name: 'Evaluación', icon: FilePenLine, color: 'red-500' },
    { name: 'Examen', icon: BookOpen, color: 'yellow-500' },
    { name: 'Proyecto', icon: FlaskConical, color: 'yellow-500' },
  ];

interface Props {
    lessons: Lesson[]
}

const ActivityFormAI = ({ lessons }: Props) => {

    const [markdown, setMarkdown] = useState('')
    const [category, setCategory] = useState('')
    const [selectedLessons, setSelectedLessons] = useState<number[]>([])
    const [activityForm, setActivityForm] = useState(false)
    const lessonIds = lessons.map(lesson => lesson.id)
    const color = 'bg-blue-700'

    const toggleClassroom = (id: number) => {
        setSelectedLessons((prev) =>
            prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
        );
    }

  return (
    <>
    <>{console.log('activityForm', activityForm)}</>
    {markdown 
    ? 
    <>
    {activityForm 
    ? 
    <ActivityForm 
        area={1}
        assignatureId={'1'}
        descriptionAI={markdown}
        categoryAI={category}
        titleAI={''}
        // createActivity={createActivity}
        lesson={lessonIds}
        setOpen={setActivityForm}
        setAIPromptOpen={() => {}}
    /> 
    : 
    <>  
        <div className="my-6 w-full flex justify-center items-center gap-10">
            
            <Button 
                label="Guardar"
                onClick={() => {
                    setActivityForm(true)
                }}
            />
            <Button 
                label='Descartar'
                onClick={() => {
                    setMarkdown('')
                    setActivityForm(false)
                }}
            />
        </div>
        <ActivityAIResponse 
            markdown={markdown}
            setMarkdown={setMarkdown}
        />
    </>}
    </> 
    : 
    <div>
        <div className="my-4">
            <h2 className="font-bold px-3 text-xl my-4">Selecciona las lecciones</h2>
            {lessons
            .map((lesson) => (
                <motion.button
                    key={lesson.id}
                    type="button"
                    onClick={() => toggleClassroom(lesson.id)}
                    className={`px-3 py-1 text-sm rounded-full transition-all duration-300 m-2 ${
                        selectedLessons.includes(lesson.id)
                            ? `${color} text-white`
                            : "dark:bg-gray-700 bg-gray-300  dark:text-gray-300 hover:" + color.replace("bg-", "hover:bg-") + " hover:text-white"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                >
                    {lesson.subject}
                </motion.button>
            ))}
        </div>
        <CategoryAISelector 
            markdown={''}
            category={category}
            setCategory={setCategory}
            setOpen={() => {}}
            iconMap={iconMap}
        />
        {category === 'tarea' && <ActivityAIFormHomework 
            lessons={lessons.filter(lesson => selectedLessons.includes(lesson.id))}
            age={10}
            markdown={markdown}
            setMarkdown={setMarkdown}
            setAITitle={() => {}}
        />}
        {category === 'trabajo en clase' && <ActivityAIFormClassActivity 
            lesson={lessons[0]}
            age={10}
            markdown={markdown}
            setMarkdown={setMarkdown}
            setAITitle={() => {}}
        />}
        {category === 'evaluación' && <ActivityAIFormTest 
            lesson={lessons[0]}
            age={10}
            markdown={markdown}
            setMarkdown={setMarkdown}
            setAITitle={() => {}}
        />}
        {category === 'examen' && <p>Examen form</p>}
        {category === 'proyecto' && <ActivityAIFormProject 
            lesson={lessons[0]}
            age={10}
            markdown={markdown}
            setMarkdown={setMarkdown}
            setAITitle={() => {}}
        />}
    </div>}
    </>
  )
}

export default ActivityFormAI