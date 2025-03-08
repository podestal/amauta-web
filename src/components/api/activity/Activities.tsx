import { useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import ActivitiesList from "./ActivitiesList"
import { useState } from "react"
import getCurrentQuarter from "../../../utils/getCurrentCuarter"
import ActivitiesHeader from "./ActivitiesHeader"

const Activities = () => {

    const [selectedQuarter, setSelectedQuarter] = useState(getCurrentQuarter());
    const state = useLocation().state

  return (
    <div>
        <motion.div 
        className="w-full max-w-3xl mx-auto px-6 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        >
        <ActivitiesHeader 
            assignatureId={state.assignatureId}
            area={state.area}
            selectedQuarter={selectedQuarter}
            setSelectedQuarter={setSelectedQuarter}
        />

        <ActivitiesList 
            assignatureId={state.assignatureId}
            area={state.area}
            quarter={selectedQuarter}
        />
        </motion.div>
    </div>
  )
}

export default Activities