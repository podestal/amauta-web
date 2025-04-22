import { BookOpen, MoreHorizontal } from 'lucide-react'
import { Lesson } from '../../../services/api/lessonService'
import moment from 'moment'

interface Props {
    lesson: Lesson
}

const LessonCard = ({ lesson }: Props) => {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl transition-shadow p-5 flex flex-col justify-between border border-gray-200 dark:border-gray-700 shadow-slate-800">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                    <BookOpen size={20} />
                    <h3 className="text-xl font-bold">{lesson.subject}</h3>
                </div>
                <MoreHorizontal className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {lesson.classroom} &mdash; {moment(lesson.created_at).format('DD/MM/YYYY')}
            </p>
            <div className="text-sm text-gray-700 dark:text-gray-300 line-clamp-4">
                {lesson.content.slice(34, 190)}...
            </div>
            <div className="mt-4 flex justify-between items-center">
                <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                    Ver más
                </button>
            </div>
        </div>
    )
}

export default LessonCard