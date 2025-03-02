import { ActivityByTutor } from "../../../services/api/activityService"
import moment from "moment"

interface Props {
    activity: ActivityByTutor
}

const ActivityByTutorCard = ({ activity }: Props) => {
  return (
        <li key={activity.id} className="flex justify-between border-b border-gray-700 py-2">
            <>{console.log('activity', activity)}</>
            <div className="flex flex-col">
                <p className="text-lg font-bold mb-2">{activity.title}</p>
                <p className="text-gray-600 dark:text-gray-400">Descripción: {activity.description}</p>
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