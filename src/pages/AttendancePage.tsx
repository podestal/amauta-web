import useLanguageStore from "../hooks/store/useLanguageStore";
import useCreateAttendance from "../hooks/api/attendance/useCreateAttendance";
import AttendanceScanForm from "../components/api/attendance/AttendanceScanForm";

const AttendancePage = () => {

  const lan = useLanguageStore(s => s.lan)
  const createAttendance = useCreateAttendance({ classroomId: '1' })

  // Have to deal with the classroomId, it should be dynamic

  return (
    <div className="w-full max-h-screen max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1280px] mx-auto overflow-hidden h-screen flex flex-col justify-start items-center pt-20">
      <h2 className="mb-20 text-4xl">{lan === 'EN' ? 'Scann Attendance' : 'Scanear Asistencia'}</h2>
      <AttendanceScanForm 
        createAttendance={createAttendance}

      />
    </div>
  );
};

export default AttendancePage;