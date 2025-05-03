import useLanguageStore from "../hooks/store/useLanguageStore";
import useCreateAttendance from "../hooks/api/attendance/useCreateAttendance";
import AttendanceScanForm from "../components/api/attendance/AttendanceScanForm";
import { motion } from "framer-motion";
import useSchoolStore from "../hooks/store/useSchoolStore";

const AttendancePage = () => {

  const lan = useLanguageStore(s => s.lan)
  const createAttendance = useCreateAttendance({ classroomId: '1' })
  const school = useSchoolStore(s => s.school)

  // Have to deal with the classroomId, it should be dynamic

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-h-screen max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1280px] mx-auto overflow-hidden h-screen flex flex-col justify-start items-center pt-10">
      <div
          className={`mb-2 px-6 py-1 rounded-lg shadow-lg flex items-center bg-yellow-100 text-gray-700 border-l-8 border-yellow-500 text-center`}
        >
          <span className="font-medium">Asistencias se marcarán como tardanza a partir de las {school.automatic_late?.slice(0,5)} am</span>
      </div>
      <h2 className="mb-20 text-4xl">{lan === 'EN' ? 'Scann Attendance' : 'Scanear Asistencia'}</h2>
      <AttendanceScanForm 
        createAttendance={createAttendance}
      />
    </motion.div>
  );
};

export default AttendancePage;