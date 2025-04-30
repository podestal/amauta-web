import { BookOpen, ClipboardList, FilePenLine, FileText, FlaskConical } from "lucide-react";
import { Lesson } from "../../../../services/api/lessonService"
import CategoryAISelector from "../../category/CategoryAISelector"
import { useState } from "react";
import ActivityAIFormProject from "./ActivityAIFormProject";
import ActivityAIFormTest from "./ActivityAIFormTest";
import ActivityAIFormClassActivity from "./ActivityAIFormClassActivity";
import ActivityAIFormHomework from "./ActivityAIFormHomework";

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

    console.log('category',category);
    

  return (
    <div>
        {lessons.map( lesson => (
            <div
                key={lesson.id}
            >
                <p>{lesson.subject}</p>
            </div>
        ))}
        <CategoryAISelector 
            markdown={''}
            category={category}
            setCategory={setCategory}
            setOpen={() => {}}
            iconMap={iconMap}
        />
        {category === 'tarea' && <ActivityAIFormHomework 
            lesson={lessons[0]}
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
    </div>
  )
}

export default ActivityFormAI