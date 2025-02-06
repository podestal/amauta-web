import { motion } from "framer-motion";
import { Attendance } from "../../../services/api/attendanceService";
import useLanguageStore from "../../../hooks/store/useLanguageStore";
import getAttendanceLabel from "../../../utils/getAttendanceLabel";
import moment from "moment";
import { RiArrowDownFill, RiArrowUpFill } from "@remixicon/react";

interface Props {
    attendanceIn?: Attendance;
    attendanceOut?: Attendance;
}
  
const DayAttendance: React.FC<Props> = ({ attendanceIn, attendanceOut }) => {
    const lan = useLanguageStore(s => s.lan);
    
    // If there is no attendance record, return null
    if (!attendanceIn && !attendanceOut) return null;

    // Get the date (either from IN or OUT attendance)
    const date = moment(attendanceIn?.created_at || attendanceOut?.created_at).format('DD-MM-YYYY');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-start items-start p-4 border-b gap-4 bg-gray-950 rounded-lg shadow-md"
        >
            {/* Date - Display only once */}
            <div className="w-full text-center">
                <span className="font-bold text-lg text-white">{date}</span>
            </div>

            {/* Attendance IN & OUT in a single row if both exist */}
            <div className="flex flex-col md:flex-row justify-between w-full gap-4">
                {/* Attendance IN */}
                {attendanceIn && (
                    <motion.div
                        className="flex w-full md:w-1/2 justify-between items-center p-3 bg-green-100 dark:bg-green-900 rounded-lg shadow-sm"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center gap-2">
                            <RiArrowDownFill className="text-green-500 text-lg" />
                            <span className="font-semibold">Entrada</span>
                        </div>
                        <span className={`text-sm font-medium 
                            ${attendanceIn.status === 'O' && 'text-green-500'}
                            ${attendanceIn.status === 'L' && 'text-amber-500'}
                            ${attendanceIn.status === 'N' && 'text-red-500'}
                        `}>
                            {getAttendanceLabel({ lan, attendance: attendanceIn.status })}
                        </span>
                    </motion.div>
                )}

                {/* Attendance OUT */}
                {attendanceOut && (
                    <motion.div
                        className="flex w-full md:w-1/2 justify-between items-center p-3 bg-blue-100 dark:bg-blue-900 rounded-lg shadow-sm"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center gap-2">
                            <RiArrowUpFill className="text-blue-500 text-lg" />
                            <span className="font-semibold">Salida</span>
                        </div>
                        <span className={`text-sm font-medium 
                            ${attendanceOut.status === 'E' && 'text-green-500'}
                            ${attendanceOut.status === 'T' && 'text-yellow-500'}
                        `}>
                            {getAttendanceLabel({ lan, attendance: attendanceOut.status })}
                        </span>
                    </motion.div>
                )}
            </div>

            {/* Observations (if any) */}
            {(attendanceIn?.observations || attendanceOut?.observations) && (
                <div className="text-gray-400 italic text-sm w-full text-center">
                    {lan === 'EN' ? 'Observations' : 'Observaciones'}: {attendanceIn?.observations || attendanceOut?.observations || '-'}
                </div>
            )}
        </motion.div>
    );
};

export default DayAttendance;
