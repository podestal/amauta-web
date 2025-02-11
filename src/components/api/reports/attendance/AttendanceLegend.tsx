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
        className="w-full grid grid-cols-8 my-12">
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
            <div className={`w-8 h-8 flex justify-center items-center rounded-lg bg-gray-700`}></div>
            <p className="text-sm">Sin Datos</p>
        </div>
        <div className="flex justify-center items-center gap-4">
            <div className={`w-8 h-8 flex justify-center items-center rounded-lg font-bold bg-blue-600 text-white`}>E</div>
            <p className="text-sm">Entrada</p>
        </div>
        <div className="flex justify-center items-center gap-4">
            <div className={`w-8 h-8 flex justify-center items-center rounded-lg font-bold bg-blue-600 text-white`}>S</div>
            <p className="text-sm">Salida</p>
        </div>
    </motion.div>
  )
}

export default AttendanceLegend
