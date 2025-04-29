import { BookOpen, ClipboardList, FilePenLine, FileText, FlaskConical } from "lucide-react";
import { Lesson } from "../../../../services/api/lessonService"
import CategoryAISelector from "../../category/CategoryAISelector"

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
            category={''}
            setCategory={() => {}}
            setOpen={() => {}}
            iconMap={iconMap}
        />
    </div>
  )
}

export default ActivityFormAI