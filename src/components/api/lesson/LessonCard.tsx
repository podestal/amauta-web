import { BookOpen, LogIn, PencilLine } from 'lucide-react'
import { Lesson } from '../../../services/api/lessonService'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import getTitleCase from '../../../utils/getTitleCase'

interface Props {
    lesson: Lesson
}

const LessonCard = ({ lesson }: Props) => {

    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate(`/app/assignatures/${lesson.assignature}/lesson/${lesson.id}`, { state: { lesson } });
    }

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl transition-shadow p-5 flex flex-col justify-between border border-gray-200 dark:border-gray-700 shadow-slate-800">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                    <BookOpen size={20} className='text-blue-600 dark:text-blue-500'/>
                    <h3 className="text-xl font-bold">{getTitleCase(lesson.subject)}</h3>
                </div>
                <PencilLine className="text-blue-600 dark:text-blue-500 hover:opacity-70 cursor-pointer" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {lesson.classroom} &mdash; {moment(lesson.created_at).format('DD/MM/YYYY')}
            </p>
            <div className="text-sm text-gray-700 dark:text-gray-300 line-clamp-4">
                {lesson.content.slice(34, 190)}...
            </div>
            <div className="mt-4 flex justify-between items-center">
                <button className="text-sm text-blue-600 dark:text-blue-400">
                    <LogIn 
                        onClick={handleNavigate}
                        className='hover:opacity-70'/>
                </button>
            </div>
        </div>
    )
}

export default LessonCard