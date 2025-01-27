import { statusStyles } from "../../attendance/AttendanceStatus"
import {motion}  from "framer-motion"

const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
}

const AttendanceLegend = () => {
  return (
    <motion.div 
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.5 }}
        className="w-full grid grid-cols-6 my-8">
        <div className="flex justify-center items-center gap-4">
            <div className={`w-8 h-8 flex justify-center items-center rounded-lg ${statusStyles['O']}`}></div>
            <p className="text-sm">A tiempo</p>
        </div>
        <div className="flex justify-center items-center gap-4">
            <div className={`w-8 h-8 flex justify-center items-center rounded-lg ${statusStyles['T']}`}></div>
            <p className="text-sm">Tardaza</p>
        </div>
        <div className="flex justify-center items-center gap-4">
            <div className={`w-8 h-8 flex justify-center items-center rounded-lg ${statusStyles['E']}`}></div>
            <p className="text-sm">Excusado</p>
        </div>
        <div className="flex justify-center items-center gap-4">
            <div className={`w-8 h-8 flex justify-center items-center rounded-lg ${statusStyles['N']}`}></div>
            <p className="text-sm">No Asistió</p>
        </div>
        <div className="flex justify-center items-center gap-4">
            <div className={`w-8 h-8 flex justify-center items-center rounded-lg ${statusStyles['L']}`}></div>
            <p className="text-sm">Salió Temprano</p>
        </div>
        <div className="flex justify-center items-center gap-4">
            <div className={`w-8 h-8 flex justify-center items-center rounded-lg dark:bg-gray-700 bg-gray-400`}></div>
            <p className="text-sm">Sin Datos</p>
        </div>
    </motion.div>
  )
}

export default AttendanceLegend
