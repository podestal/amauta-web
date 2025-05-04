import { useEffect, useState } from "react";
import useLanguageStore from "../../../hooks/store/useLanguageStore";
// import { getAttendanceStatus } from "../../../utils/data";
import useAuthStore from "../../../hooks/store/useAuthStore";
import { CreateAttendanceData } from "../../../hooks/api/attendance/useCreateAttendance";
import { Attendance } from "../../../services/api/attendanceService";
import { UseMutationResult } from "@tanstack/react-query";
import AttendanceScanner from "./AttendanceScanner";
// import { isAttendanceCreated } from "../../../utils/isAttendanceCreated";
import { Instructor } from "../../../services/api/instructorService";
import useGetProfileStore from "../../../hooks/store/useGetProfileStore";
import useNotificationsStore from "../../../hooks/store/useNotificationsStore";

interface Props {
  createAttendance: UseMutationResult<Attendance, Error, CreateAttendanceData>;
}

const AttendanceScanForm = ({ createAttendance }: Props) => {

  const { setMessage, setShow, setType } = useNotificationsStore()
  const profile = useGetProfileStore((s) => s.profile);
  const instructor = profile as Instructor;
  const [selectedKind, setSelectedKind] = useState("I");
  const [selectedStatus, setSelectedStatus] = useState("0");
  const [successMsg, setSuccessMsg] = useState("");
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [selectedClassroom, setSelectedClassroom] = useState("0");
  const [isLoading, setIsLoading] = useState(false);
  const lan = useLanguageStore((s) => s.lan);
  const [leftEarly, setLeftEarly] = useState(false);
  const access = useAuthStore((s) => s.access) || "";

  const [alreadyScannedError, setAlreadyScannedError] = useState("");
  // const showScanner = classrooms.length === 2 || selectedClassroom !== "0";

  useEffect(() => {
    if (instructor && instructor?.clases_details.length === 1) {
      const classroomId = instructor?.clases_details[0].split("-").pop();
      classroomId && setSelectedClassroom(classroomId);
    }
  }, [instructor, selectedClassroom, setSelectedClassroom]);

  const handleSuccess = (decodedText: string, pauseScanner: any, resumeScanner: any, stopScanner: any) => {
    console.log(stopScanner)
    console.log(attendances)
    
    const [studentUid, studentName] = decodedText.split("-");
    pauseScanner();

    setIsLoading(true);
    createAttendance.mutate(
      {
        attendance: {
          status: selectedStatus,
          student: studentUid,
          created_by: `${instructor?.first_name} ${instructor?.last_name}`,
          attendance_type: "A",
          kind: selectedKind,
        },
        access,
      },
      {
        onSuccess: () => {
          // setSuccessMsg(lan === "EN" ? `Attendance created for ${studentName}` : `Asistencia creada para ${studentName}`);
          // setTimeout(() => {
          //   setSuccessMsg("");
          // }, 1000);
          setType('success')
          setShow(true)
          setMessage(`${studentName} escaneado con éxito`)
          setSuccessMsg('')
        },
        onError: (err:any) => {          
          setType('error')
          setShow(true)
          setMessage(lan === 'EN' ? 'Error registering attendance' : err?.response?.data.error || 'Error registrando asistencia')
        },
        onSettled: () => {
          setIsLoading(false);
          setTimeout(() => {
            setAlreadyScannedError("");
            resumeScanner();
          }, 1000);
        },
      }
    );
  };

  return (
    <div className="w-full h-full flex flex-col justify-start items-center">
      <div>
      </div>
      <div className="w-full flex justify-center">
        {successMsg && <div className="text-green-600 font-semibold mb-4 absolute top-10 text-center">{successMsg}</div>}
      </div>
      <button 
        onDoubleClick={() => {
          if (leftEarly) {
            setLeftEarly(false);
            setSelectedKind("I");
            setSelectedStatus('O');
          } else {
            setLeftEarly(true);
            setSelectedKind("O");
            setSelectedStatus('T')
          }
        }}
        className={`w-[50%] cursor-pointer py-4 px-6 text-center font-semibold text-sm rounded-xl  shadow-lg transition-transform duration-300 ease-in-out hover:scale-105   ${leftEarly ? 'bg-yellow-400 shadow-yellow-500 text-white' : 'bg-gradient-to-r dark:text-slate-50 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 from-gray-100 via-gray-200 to-gray-300'}`}>
        Salida Temprano
      </button>
        <AttendanceScanner
          onScanSuccess={handleSuccess}
          classroomId={selectedClassroom}
          setAttendances={setAttendances}
          errorMessage={alreadyScannedError}
          leftEarly={leftEarly}
        />
      {isLoading && (
        <div className="text-blue-600 font-semibold mt-4">
          {lan === "EN" ? "Creating Attendance..." : "Creando Asistencia..."}
        </div>
      )}
      {successMsg && (
        <div className="text-green-600 font-semibold mt-4">{successMsg}</div>
      )}
    </div>
  );
};

export default AttendanceScanForm;
