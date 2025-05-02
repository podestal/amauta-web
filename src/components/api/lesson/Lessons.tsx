import { motion } from "framer-motion"
import CreateLesson from "./CreateLesson"
import LessonList from "./LessonList"
import GoBack from "../../ui/GoBack"
import MultiOptionSwitch from "../../ui/MultiOptionSwitch"
import { useState } from "react"
import getCurrentQuarter from "../../../utils/getCurrentCuarter"

interface Props {
    classroom: string
    assignature: string
    area: string
}

const quarterToIndex: Record<string, number> = {
    'Q1': 0,
    'Q2': 1,
    'Q3': 2,
    'Q4': 3,
}

const Lessons = ({ classroom, assignature, area }: Props) => {

    const currentQuarter = getCurrentQuarter()
    const [quarter, setQuarter] = useState(quarterToIndex[currentQuarter])
    
    
  return (
    <motion.div
        className="flex flex-col gap-4 w-full h-full p-4 justify-start items-center pt-10 "
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
    >

        <div className="w-full grid grid-cols-3 gap-12 px-4">
        <div className="flex justify-start items-center">
        <GoBack 
            path={`/app/assignatures/`}
            state={{}}
        />
        </div>
        <div className="flex justify-center items-center">
        <CreateLesson 
            classroom={classroom}
            assignature={assignature}
            quarter={quarter === 0 ? 'Q1' : quarter === 1 ? 'Q2' : quarter === 2 ? 'Q3' : 'Q4'}
        />
        </div>
        <MultiOptionSwitch 
            options={['S1', 'S2', 'S3', 'S4']}
            selected={quarter}
            setSelected={setQuarter}
        />
        <div/>
        </div>
        <LessonList 
            classroom={classroom}
            assignature={assignature}
            area={area}
            quarter={quarter === 0 ? 'Q1' : quarter === 1 ? 'Q2' : quarter === 2 ? 'Q3' : 'Q4'}
        />
    </motion.div>
  )
}

export default Lessons