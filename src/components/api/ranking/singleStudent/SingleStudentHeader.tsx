import { ArrowLeftIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { StudentByTotalScore } from "../../../../services/api/studentsService";

interface Props {
    student: StudentByTotalScore
}

const gradeColors: Record<string, string> = {
    'C': 'bg-red-500 text-white',
    'B': 'bg-yellow-500 text-white',
    'A': 'bg-blue-500 text-white',
    'AD': 'bg-green-600 text-white',
  };

const SingleStudentHeader = ({ student }: Props) => {

    const navigate = useNavigate()

  return (
    <>
        <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-6 hover:underline"
        >
            <ArrowLeftIcon className="h-5 w-5" />
            Volver al Ranking
        </button>

        <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center text-2xl font-bold">
            {student.first_name.split(' ').map((n) => n[0]).join('').toLocaleUpperCase()}
            </div>
            <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{student.first_name} {student.last_name}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Promedio actual: 
                <span className={`ml-2 px-2 py-0.5 rounded-full ${gradeColors[student.average_alphabetical]}`}>
                {student.average_alphabetical}
                </span>
            </p>
            </div>
        </div>
    </>
  )
}

export default SingleStudentHeader