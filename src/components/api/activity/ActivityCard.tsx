import { motion } from 'framer-motion';
import { Activity } from '../../../services/api/activityService';
import moment from 'moment';
import { capacities, competencies } from '../../../data/mockdataForGrades';
import { useNavigate } from 'react-router-dom';
import UpdateActivity from './UpdateActivity';

interface Props {
    activity: Activity
    isPastDue: boolean
    assignatureId: string
    area: string
    classroom: string
    descriptionAi?: boolean
}

const ActivityCard = ({ activity, isPastDue, assignatureId, area, classroom, descriptionAi }: Props) => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/app/assignatures/${assignatureId}/activity/${activity.id}`, { state: { activity: activity, assignatureId, area } })
    }

  return (
    <div 
        key={activity.id}
        className='flex'>
    <motion.li
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleClick}
        className={` flex-1 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer transition-transform transform hover:shadow-lg border-l-4 
            ${isPastDue ? "border-gray-500" : "border-blue-500"}`}
        >
        <h3 className="text-lg font-semibold">{activity.title}</h3>
        {!descriptionAi && <p className="text-gray-600 dark:text-gray-300">Descripción: {activity.description}</p>}
        <div className='my-2'>
            <span className='bg-blue-600 text-slate-50 text-sm font-medium px-3 py-1 rounded-full'>{activity.category_name}</span>
        </div>
        <p className="text-sm text-gray-500 mt-2">
            📅 Fecha de entrega: {moment(activity.due_date).format("DD/MM/YYYY")}
        </p>

        {/* Competencies Tags */}
        {activity.competences.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
            {activity.competences.map((competenceId) => {
                const competence = competencies.find((c) => c.id === competenceId);
                return competence ? (
                <span
                    key={competence.id}
                    className="bg-blue-200 text-blue-800 text-xs font-medium px-3 py-1 rounded-full"
                >
                    {competence.title}
                </span>
                ) : null;
            })}
            </div>
        )}

        {/* Capacities Tags */}
        {activity.capacities?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
            {activity.capacities.map((capacityId) => {
                const capacity = capacities.find((c) => c.id === capacityId);
                return capacity ? (
                <span
                    key={capacity.id}
                    className="bg-green-200 text-green-800 text-xs font-medium px-3 py-1 rounded-full"
                >
                    {capacity.title}
                </span>
                ) : null;
            })}
            </div>
        )}
        </motion.li>
        <UpdateActivity 
            activity={activity} 
            assignatureId={assignatureId} 
            area={parseInt(area)}
            classroom={classroom}
        />
    </div>

  )
}

export default ActivityCard