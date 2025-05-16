import { motion } from "framer-motion"
import moment from "moment"
import { GradeByStudent } from "../../../../services/api/gradeService"

interface Props {
    studentUid: string
    quarter: string
    grades: GradeByStudent[]
}

const gradeColors: Record<string, string> = {
    'NA': 'bg-gray-500 text-white',
    'C': 'bg-red-500 text-white',
    'B': 'bg-yellow-500 text-white',
    'A': 'bg-blue-500 text-white',
    'AD': 'bg-green-600 text-white',
  };

const RankingStudentActivities = ({ grades }: Props) => {

    return (
        <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Actividades Recientes</h2>
            <div className="space-y-4">
            {grades && grades.map((activity, idx) => (
                <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="flex justify-between items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-4 py-3 shadow-sm"
                >
                    <div>
                        <p className="text-md font-medium text-gray-900 dark:text-gray-100">{activity.assignature} - {activity.activity}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{moment(activity.due_date).format('DD-MM-YYYY')}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${gradeColors[activity.calification]}`}>
                        {activity.calification}
                    </div>
                </motion.div>
            ))}
            </div>
        </div>
    )
}

export default RankingStudentActivities