import useLanguageStore from "../hooks/store/useLanguageStore";
import useCreateAttendance from "../hooks/api/attendance/useCreateAttendance";
import AttendanceScanForm from "../components/api/attendance/AttendanceScanForm";
import { motion } from "framer-motion";

const AttendancePage = () => {

  const lan = useLanguageStore(s => s.lan)
  const createAttendance = useCreateAttendance({ classroomId: '1' })

  // Have to deal with the classroomId, it should be dynamic

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-h-screen max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1280px] mx-auto overflow-hidden h-screen flex flex-col justify-start items-center pt-10">
      <h2 className="mb-20 text-4xl">{lan === 'EN' ? 'Scann Attendance' : 'Scanear Asistencia'}</h2>
      <AttendanceScanForm 
        createAttendance={createAttendance}
      />
    </motion.div>
  );
};

export default AttendancePage;