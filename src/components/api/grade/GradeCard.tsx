import { motion } from "framer-motion"
import { GradeByActivity } from "../../../services/api/gradeService"
import useUpdateGrade from "../../../hooks/api/grade/useUpdateGrade";
import useAuthStore from "../../../hooks/store/useAuthStore";

interface Props {
    grade: GradeByActivity
    index: number
    activityId: string
}

const gradeOptions = ["NA", "C", "B", "A", "AD"];
const gradeStyles: Record<string, string> = {
  "A": "bg-blue-500 text-white",
  "B": "bg-yellow-500 text-white",
  "C": "bg-red-500 text-white",
  "AD": "bg-green-500 text-white",
  "NA": "bg-gray-300 text-gray-700", 
};

const GradeCard = ({ grade, index, activityId }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const updateGrade = useUpdateGrade({ gradeId: grade.id, activityId })

    const handleUpdateGrade = (newGrade: string) => {
        updateGrade.mutate({
            access,
            grade: {
                calification: newGrade,
                observations: ''
            }
        })
    }

  return (
    <motion.div
        key={grade.student.uid}
        className="border-bborder-gray-700 hover:bg-gray-800 transition-colors grid grid-cols-8"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        >
        <h2 className="flex items-center justify-left px-2">{grade.student.uid}</h2>
        <h2 className="flex items-center justify-left">{grade.student.last_name}</h2>
        <h2 className="flex items-center justify-left">{grade.student.first_name}</h2>
        <div className="py-3 px-4 text-center col-span-5">
            <div className="w-full flex justify-evenly gap-2">
            {gradeOptions.map( optionGrade => (
                <>
                <p 
                  onClick={() => handleUpdateGrade(optionGrade)}
                    className={` w-16 rounded-3xl cursor-pointer hover:opacity-80 transition-all duration-300 ${optionGrade === grade.calification ? `${gradeStyles[grade.calification]}` : 'bg-gray-300 text-gray-700'}`}>{optionGrade}</p>
                </>
            ))}
            </div>
        </div>
        </motion.div>
  )
}

export default GradeCard