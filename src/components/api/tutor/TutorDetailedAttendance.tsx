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
    const currentMonth = new Date().getMonth() + 1
    const [selectedMonth, setSelectedMonth] = useState(currentMonth.toString())

    return (
      <motion.div 
        
        className="max-w-4xl mx-auto px-4 h-screen overflow-y-scroll">
        <h1 className="text-4xl font-poppins font-bold mb-10 text-center">
            {lan === 'EN' ? 'Attendance' : 'Asistencia'}
        </h1>
        <div className="w-full my-4 flex justify-center items-center mx-auto">
          {/* <label className="text-md">{lan === 'EN' ? 'Month:' : 'Mes'}</label> */}
          <MonthSelector 
            setSelectedMonth={setSelectedMonth}
            selectedMonth={selectedMonth}
          />
        </div>
        <div className="pb-[200px]"> 
          <TutorAttedences 
            studentId={studentId}
            selectedMonth={selectedMonth}
          />
        </div>
      </motion.div>
    );
}

export default TutorDetailedAttendance