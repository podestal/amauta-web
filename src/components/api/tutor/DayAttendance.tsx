import { motion } from "framer-motion";
import { Attendance } from "../../../services/api/attendanceService";
import useLanguageStore from "../../../hooks/store/useLanguageStore";
import getAttendanceLabel from "../../../utils/getAttendanceLabel";
import moment from "moment";

interface Props {
    attendance: Attendance;
  }
  
  const DayAttendance: React.FC<Props> = ({ attendance }) => {

    const lan = useLanguageStore(s=>s.lan)
    const attendanceLabel = getAttendanceLabel({ lan, attendance: attendance.status })
    const date = moment(attendance.created_at).format('DD-MM-YYYY')

    const itemVariants = {
      hidden: { opacity: 0, x: 50 }, // Starts off-screen to the right
      visible: { opacity: 1, x: 0 }, // Slides into place
    };

    return (
      <motion.div 
        variants={itemVariants}
        className="flex flex-col justify-between items-start p-4 border-b gap-4">
        <div className="w-full flex justify-between items-center">
          <span className="font-bold">{date}</span>
          <span className={`ml-2 
                ${attendance.status === 'O' && 'text-green-500'}
                ${attendance.status === 'L' && 'text-amber-500'}
                ${attendance.status === 'N' && 'text-red-500'}
                ${attendance.status === 'E' && 'text-green-500'}
                ${attendance.status === 'T' && 'text-yellow-500'}
            `}>
            {attendanceLabel}
          </span>
        </div>
        <div className="text-gray-400 italic text-">
            {lan === 'EN' ? 'Observation' : 'Observaciones'}: {attendance.observations ? attendance.observations : '-'}        
        </div>
      </motion.div>
    );
  };

export default DayAttendance