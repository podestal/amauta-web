import { useEffect, useState } from "react";
import Selector from "../../ui/Selector";
import useLanguageStore from "../../../hooks/store/useLanguageStore";
import { getAttendanceStatus } from "../../../utils/data";
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
  const attendanceStatus = getAttendanceStatus(lan);
  const kind = [
    {
      id:'I',
      name: lan === 'EN' ? 'Entrance' : 'Entrada',
    },
    {
      id:'O',
      name: lan === 'EN' ? 'Exit' : 'Salida',
    }
  ]
  // const classrooms = [
  //   {
  //     id: "0",
  //     name: lan === "EN" ? "Select" : "Selecionar",
  //   },
  //   ...(instructor ? getInstructorClassrooms(instructor.clases_details, lan) : []),
  // ];
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
    // setAlreadyScannedError("");

    // const alreadyScanned = attendances && isAttendanceCreated(attendances, studentUid, selectedKind);
    // if (alreadyScanned) {
    //   setAlreadyScannedError(lan === "EN" ? "Student already scanned" : "Estudiante ya fué escaneado");
    //   setTimeout(() => {
    //     setAlreadyScannedError("");
    //     resumeScanner();
    //   }, 1000);
    //   return;
    // }
    
    

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
        onError: () => {
          // setAlreadyScannedError(error.message)
          // setAlreadyScannedError(`${studentName} ya fué escaneado`);
          setType('error')
          setShow(true)
          setMessage(`${studentName} ya fué escaneado`)

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
      <div className="w-full flex justify-center">
        {successMsg && <div className="text-green-600 font-semibold mb-4 absolute top-10 text-center">{successMsg}</div>}
      </div>
      <Selector
        values={kind}
        setter={setSelectedKind}
        defaultValue={selectedKind}
        label={lan === "EN" ? "Kind" : "Tipo"}
      />
      <Selector
        values={selectedKind === 'I' 
          ? attendanceStatus.filter( status => status.id !== 'T')
          : attendanceStatus.filter( status => status.id !== 'L' && status.id !== 'O')}
        setter={setSelectedStatus}
        defaultValue={selectedStatus}
        label="Status"
      />
      {/* {classrooms.length > 2 && (
        <Selector
          values={classrooms}
          setter={setSelectedClassroom}
          defaultValue={selectedClassroom}
          label={lan === "EN" ? "Classroom" : "Salón"}
        />
      )} */}
        <AttendanceScanner
          onScanSuccess={handleSuccess}
          selectedStatus={selectedStatus}
          classroomId={selectedClassroom}
          setAttendances={setAttendances}
          errorMessage={alreadyScannedError}
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
