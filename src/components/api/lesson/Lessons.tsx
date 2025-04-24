import { motion } from "framer-motion"
import CreateLesson from "./CreateLesson"
import LessonList from "./LessonList"
import GoBack from "../../ui/GoBack"

interface Props {
    classroom: string
    assignature: string
}

const Lessons = ({ classroom, assignature }: Props) => {
    
  return (
    <motion.div
        className="flex flex-col gap-4 w-full h-full p-4 justify-start items-center pt-10 "
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
    >

        <div className="w-full flex justify-between items-center gap-12 px-4">
        <GoBack 
            path={`/app/assignatures/`}
            state={{}}
        />
        <CreateLesson 
            classroom={classroom}
            assignature={assignature}
        />
        <div/>
        </div>
        <LessonList 
            classroom={classroom}
        />
    </motion.div>
  )
}

export default Lessons