import ReactMarkdown from "react-markdown"
import { ActivityByTutor } from "../../../services/api/activityService"

import moment from "moment"
import { ArrowUp, BookOpenText } from "lucide-react"
import remarkGfm from "remark-gfm"
// import { useState } from "react"

interface Props {
    activity: ActivityByTutor
}

const ActivityByTutorCard = ({ activity }: Props) => {

    // const [showDescription, setShowDescription] = useState(false)

  return (
        <li key={activity.id} className="flex justify-between border-b border-gray-700 py-2">
            <div className="flex flex-col">
                <p className="text-lg font-bold mb-2 dark:text-slate-50 text-black">{activity.title}</p>
                {/* <p className="text-gray-600 dark:text-gray-400">Descripción: {activity.description}</p> */}
                <ArrowUp className="text-black dark:text-slate-50 hover:opacity-70"/>
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                    h2: ({ node, ...props }) => (
                        <h2 className="mt-10 mb-4 text-2xl font-bold flex items-center gap-2 text-indigo-600 dark:text-indigo-300">
                        <BookOpenText className="w-5 h-5 text-indigo-400" />
                        <span {...props} />
                        </h2>
                    ),
                    h3: ({ node, ...props }) => (
                        <h3 className="mt-6 mb-2 text-xl font-semibold text-gray-800 dark:text-slate-100" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                        <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700 dark:text-slate-100" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                        <ol className="list-decimal list-inside space-y-2 ml-4 text-gray-700 dark:text-slate-100" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                        <li className="text-base leading-relaxed" {...props} />
                    ),
                    p: ({ node, ...props }) => (
                        <p className="text-base text-gray-800 dark:text-slate-100 leading-relaxed mb-4" {...props} />
                    ),
                    strong: ({ node, ...props }) => (
                        <strong className="font-semibold text-indigo-700 dark:text-indigo-300" {...props} />
                    ),
                    }}
                >
                    {activity.description}
            </ReactMarkdown>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Observaciones: {activity.observations}</p>
                    <p className="text-sm text-gray-500 mt-2">
                    📅 Fecha de entrega: {moment(activity.due_date).format("DD/MM/YYYY")}
                </p>
            </div>
            
            <span className={`font-semibold ${
                activity.grade === 'C' ? 'text-red-600'
            : activity.grade === 'B' ? 'text-yellow-500'
            : activity.grade === 'A' ? 'text-blue-400'
                : 'text-green-400'
            }`}>
                {activity.grade}
            </span>
        </li>
  )
}

export default ActivityByTutorCard