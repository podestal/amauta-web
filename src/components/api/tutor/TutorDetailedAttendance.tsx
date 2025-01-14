import { useParams } from "react-router-dom";
import useLanguageStore from "../../../hooks/store/useLanguageStore";
import MonthSelector from "../../ui/MonthSelector";
import { useState } from "react";
import { motion } from "framer-motion";
import TutorAttedences from "./TutorAttedences";


const TutorDetailedAttendance = () => {
    const params = useParams()
    const lan = useLanguageStore(s=>s.lan)
    const studentId = params.studentId || ''
    const mcurrentMnth = new Date().getMonth() + 1
    const [selectedMonth, setSelectedMonth] = useState(mcurrentMnth.toString())

    return (
      <motion.div 
        
        className="max-w-4xl mx-auto p-8 ">
        <h1 className="text-2xl font-bold mb-10 text-center">
            {lan === 'EN' ? 'Attendance' : 'Asistencia'}
        </h1>
        <div className="w-full my-4 flex justify-between items-center">
          <label className="font-medium text-lg">{lan === 'EN' ? 'Select Month:' : 'Selecciona un Mes'}</label>
          <MonthSelector 
            setSelectedMonth={setSelectedMonth}
            selectedMonth={selectedMonth}
          />
        </div>
        <TutorAttedences 
          studentId={studentId}
          selectedMonth={selectedMonth}
        />
      </motion.div>
    );
}

export default TutorDetailedAttendance