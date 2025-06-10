// import { BookOpen, ClipboardList, FilePenLine, FileText, FlaskConical } from "lucide-react";
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
import useCreateActivity from "../../../../hooks/api/activity/useCreateActivity";
import getCurrentQuarter from "../../../../utils/getCurrentCuarter";
import getAgeFromClassroom from "../../../../utils/getAgeFromClassroom";
import ActivityAIFormFinal from "./ActivityAIFormFinal";
import useGetCategories from "../../../../hooks/api/category/useGetCategories";
import useAuthStore from "../../../../hooks/store/useAuthStore";

// const iconMap = [
//     { name: 'Tarea', icon: FileText, color: 'blue-500' },
//     { name: 'Trabajo en clase', icon: ClipboardList, color: 'green-500' },
//     { name: 'Evaluación', icon: FilePenLine, color: 'red-500' },
//     { name: 'Examen', icon: BookOpen, color: 'yellow-500' },
//     { name: 'Proyecto', icon: FlaskConical, color: 'yellow-500' },
//   ];

interface Props {
    lessons: Lesson[]
    area: number
    assignatureId: string
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    classroom: string
}

const ActivityFormAI = ({ lessons, area, assignatureId, setOpen, classroom }: Props) => {

    const access = useAuthStore(state => state.access) || ''
    const [markdown, setMarkdown] = useState('')
    const [category, setCategory] = useState('')
    const [selectedLessons, setSelectedLessons] = useState<number[]>([])
    const [activityForm, setActivityForm] = useState(false)
    const lessonIds = lessons.map(lesson => lesson.id)
    const color = 'bg-blue-700'
    const quarter = getCurrentQuarter()
    const age = getAgeFromClassroom(classroom)

    const createActivity = useCreateActivity({assignatureId: '1', quarter})

    const toggleClassroom = (id: number) => {
        setSelectedLessons((prev) =>
            prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
        );
    }
    
    const { data: categories, isLoading, isError, error, isSuccess } = useGetCategories({ access })

    if (isLoading) return <p className="animate-pulse text-center my-8 text-xl">Cargando...</p>
    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess)

  return (
    <>
    {/* <>{console.log('activityForm', activityForm)}</> */}
    {markdown 
    ? 
    <>
    {activityForm 
    ? 
    <ActivityForm 
        area={area}
        assignatureId={assignatureId}
        descriptionAI={markdown}
        categoryAI={category}
        titleAI={''}
        createActivity={createActivity}
        lesson={lessonIds}
        setOpen={setActivityForm}
        setAIPromptOpen={setOpen}
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
                color="red"
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
            markdown={markdown}
            category={category}
            setCategory={setCategory}
            setOpen={setOpen}
            lesson={true}
            categories={categories}
            exam
        />
        {category === 'tarea' && <ActivityAIFormHomework 
            lessons={lessons.filter(lesson => selectedLessons.includes(lesson.id))}
            age={age}
            markdown={markdown}
            setMarkdown={setMarkdown}
            setAITitle={() => {}}
        />}
        {category === 'trabajo en clase' && <ActivityAIFormClassActivity 
            lessons={lessons.filter(lesson => selectedLessons.includes(lesson.id))}
            age={age}
            markdown={markdown}
            setMarkdown={setMarkdown}
            setAITitle={() => {}}
        />}
        {category === 'evaluación' && <ActivityAIFormTest 
            lessons={lessons.filter(lesson => selectedLessons.includes(lesson.id))}
            age={age}
            markdown={markdown}
            setMarkdown={setMarkdown}
            setAITitle={() => {}}
        />}
        {category === 'examen' && <ActivityAIFormFinal
            lessons={lessons.filter(lesson => selectedLessons.includes(lesson.id))}
            age={age}
            markdown={markdown}
            setMarkdown={setMarkdown}
            setAITitle={() => {}}
        />}
        {category === 'proyecto' && <ActivityAIFormProject 
            lessons={lessons.filter(lesson => selectedLessons.includes(lesson.id))}
            age={age}
            markdown={markdown}
            setMarkdown={setMarkdown}
            setAITitle={() => {}}
        />}
    </div>}
    </>
  )
}

export default ActivityFormAI