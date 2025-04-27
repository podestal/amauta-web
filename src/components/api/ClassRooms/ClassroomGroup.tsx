import { motion } from "framer-motion";
import getClassroomDescription from "../../../utils/getClassroomDescription";
import { Classroom } from "../../../services/api/classroomService";

interface Props {
    level: string
    title: string
    color: string
    classrooms: Classroom[]
    selectedClassrooms: number[]
    toggleClassroom: (id: number) => void
}

const ClassroomGroup = ({ level, title, color, classrooms, selectedClassrooms, toggleClassroom } : Props) => {
    return (
        <div>
            <h2 className="font-bold">{title}</h2>
            {classrooms
                .filter((classroom) => classroom.level === level)
                .map((classroom) => (
                    <motion.button
                        key={classroom.id}
                        type="button"
                        onClick={() => toggleClassroom(classroom.id)}
                        className={`px-3 py-1 text-sm rounded-full transition-all duration-300 m-2 ${
                            selectedClassrooms.includes(classroom.id)
                                ? `${color} text-white`
                                : "dark:bg-gray-700 bg-gray-300  dark:text-gray-300 hover:" + color.replace("bg-", "hover:bg-") + " hover:text-white"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                    >
                        {getClassroomDescription({ grade: classroom.grade, level: classroom.level, section: classroom.section, lan: "ES" })}
                    </motion.button>
                ))}
        </div>
    );
};

export default ClassroomGroup