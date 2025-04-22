import { motion } from "framer-motion"
import CreateLesson from "./CreateLesson"
import LessonList from "./LessonList"

interface Props {
    classroom: string
}

const Lessons = ({ classroom }: Props) => {
  return (
    <motion.div
        className="flex flex-col gap-4 w-full h-full p-4 justify-start items-center pt-10 "
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
    >
        <div>
        <CreateLesson 
            classroom={classroom}
        />
        </div>
        <LessonList 

        />
    </motion.div>
  )
}

export default Lessons