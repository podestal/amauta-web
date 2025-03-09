import { motion } from "framer-motion"
import useGetGradesByActivity from "../../../hooks/api/grade/useGetGradesByActivity"
import useAuthStore from "../../../hooks/store/useAuthStore"
import useLoader from "../../../hooks/ui/useLoader"
import GradeCard from "./GradeCard"

interface Props {
    activityId: string
}

const Grades = ({ activityId }: Props) => {

    const access  = useAuthStore(s => s.access) || ''
    const { data: grades, isLoading, isError, error, isSuccess } = useGetGradesByActivity({ access, activityId })

    useLoader(isLoading)

    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess)
    

  return (
    <>
        <div className="overflow-x-auto">
        <motion.div
          className="w-full border-collapse bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Table Header */}
          <div className="grid grid-cols-8 bg-gray-800 text-white font-bold min-h-14 max-lg:hidden">
              <h2 className="flex items-center justify-left px-2">DNI</h2>
              <h2 className="flex items-center justify-left">Nombres</h2>
              <h2 className="flex items-center justify-left">Apellido</h2>
              <h2 className="flex items-center justify-center col-span-5">Calificación</h2>
          </div>

          {/* Table Body */}
          <div>
            {grades
                // .sort((a, b) => a.student.last_name.localeCompare(b.student.last_name))
                .map((grade, index) => (
                <GradeCard 
                    key={grade.id} 
                    grade={grade} 
                    index={index}
                    activityId={activityId}
                />
            ))}
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default Grades