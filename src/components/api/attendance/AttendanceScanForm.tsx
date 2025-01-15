import { useEffect, useState } from "react";
import Selector from "../../ui/Selector";
import useLanguageStore from "../../../hooks/store/useLanguageStore";
import { getAttendanceStatus, getInstructorClassrooms } from "../../../utils/data";
import useAuthStore from "../../../hooks/store/useAuthStore";
import { CreateAttendanceData } from "../../../hooks/api/attendance/useCreateAttendance";
import { Attendance } from "../../../services/api/attendanceService";
import { UseMutationResult } from "@tanstack/react-query";
import AttendanceScanner from "./AttendanceScanner";
import { isAttendanceCreated } from "../../../utils/isAttendanceCreated";
import { Instructor } from "../../../services/api/instructorService";
import useGetProfileStore from "../../../hooks/store/useGetProfileStore";

interface Props {
  createAttendance: UseMutationResult<Attendance, Error, CreateAttendanceData>;
}

const AttendanceScanForm = ({ createAttendance }: Props) => {

  const profile = useGetProfileStore((s) => s.profile);
  const instructor = profile as Instructor;
  const [selectedStatus, setSelectedStatus] = useState("0");
  const [successMsg, setSuccessMsg] = useState("");
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [selectedClassroom, setSelectedClassroom] = useState("0");
  const [isLoading, setIsLoading] = useState(false);
  const lan = useLanguageStore((s) => s.lan);
  const attendanceStatus = getAttendanceStatus(lan);
  const classrooms = [
    {
      id: "0",
      name: lan === "EN" ? "Select" : "Selecionar",
    },
    ...(instructor ? getInstructorClassrooms(instructor.clases_details, lan) : []),
  ];
  const access = useAuthStore((s) => s.access) || "";

  const [alreadyScannedError, setAlreadyScannedError] = useState("");
  const showScanner = classrooms.length === 2 || selectedClassroom !== "0";

  useEffect(() => {
    if (instructor && instructor?.clases_details.length === 1) {
      const classroomId = instructor?.clases_details[0].split("-").pop();
      classroomId && setSelectedClassroom(classroomId);
    }
  }, [instructor, selectedClassroom, setSelectedClassroom]);

  const handleSuccess = (decodedText: string, stopScanner: any, resumeScanner: any) => {
    const [studentUid, studentName] = decodedText.split("-");
    stopScanner();
    setAlreadyScannedError("");

    const alreadyScanned = attendances && isAttendanceCreated(attendances, studentUid);
    if (alreadyScanned) {
      setAlreadyScannedError(lan === "EN" ? "Student already scanned" : "Estudiante ya fué escaneado");
      setTimeout(() => {
        setAlreadyScannedError("");
        resumeScanner();
      }, 1000);
      return;
    }

    setIsLoading(true);
    createAttendance.mutate(
      {
        attendance: {
          status: selectedStatus,
          student: studentUid,
          created_by: `${instructor?.first_name} ${instructor?.last_name}`,
          attendance_type: "A",
        },
        access,
      },
      {
        onSuccess: () => {
          setSuccessMsg(lan === "EN" ? `Attendance created for ${studentName}` : `Asistencia creada para ${studentName}`);
          setTimeout(() => {
            setSuccessMsg("");
          }, 1000);
        },
        onError: (error) => {
          setAlreadyScannedError(error.message)
        },
        onSettled: () => {
          setIsLoading(false);
          setTimeout(() => {
            resumeScanner();
          }, 1000);
        },
      }
    );
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-center">
        {successMsg && <div className="text-green-600 font-semibold mb-4 absolute top-10 text-center">{successMsg}</div>}
      </div>
      <Selector
        values={attendanceStatus}
        setter={setSelectedStatus}
        defaultValue={selectedStatus}
        label="Status"
      />
      {classrooms.length > 2 && (
        <Selector
          values={classrooms}
          setter={setSelectedClassroom}
          defaultValue={selectedClassroom}
          label={lan === "EN" ? "Classroom" : "Salón"}
        />
      )}
      {showScanner && (
        <AttendanceScanner
          onScanSuccess={handleSuccess}
          selectedStatus={selectedStatus}
          classroomId={selectedClassroom}
          setAttendances={setAttendances}
          errorMessage={alreadyScannedError}
        />
      )}
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
