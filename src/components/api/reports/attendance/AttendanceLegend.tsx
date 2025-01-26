import { statusStyles } from "../../attendance/AttendanceStatus"

const AttendanceLegend = () => {
  return (
    <div className="w-full grid grid-cols-6 my-8">
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
    </div>
  )
}

export default AttendanceLegend
