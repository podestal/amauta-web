import { useState } from "react";
import useInstructorStore from "../../../hooks/store/useInstructorStore";
import Selector from "../../ui/Selector"
import useLanguageStore from "../../../hooks/store/useLanguageStore";
import { getAttendanceStatus, getInstructorClassrooms } from "../../../utils/data";
import useAuthStore from "../../../hooks/store/useAuthStore";
import { CreateAttendanceData } from "../../../hooks/api/attendance/useCreateAttendance";
import { Attendance } from "../../../services/api/attendanceService";
import { UseMutationResult } from "@tanstack/react-query";
import AttendanceScanner from "./AttendanceScanner";
import { isAttendanceCreated } from "../../../utils/isAttendanceCreated";

interface Props {
    createAttendance: UseMutationResult<Attendance, Error, CreateAttendanceData>
}

const AttendanceScanForm = ({ createAttendance }: Props) => {
    
    const instructor = useInstructorStore(s => s.instructor);
    const [selectedStatus, setSelectedStatus] = useState('0');
    const [selectedClassroom, setSelectedClassroom] = useState('0')
    const [attendances, setAttendances] = useState<Attendance[]>()
    const [isLoading, setIsLoading] = useState(false);
    const lan = useLanguageStore(s => s.lan);
    const attendanceStatus = getAttendanceStatus(lan);
    const classrooms = [
      {
        id: '0',
        name: lan === 'EN' ? 'Select' : 'Selecionar',
      },
      ...(instructor ? getInstructorClassrooms(instructor.clases_details, lan) : []),
    ]
    const access = useAuthStore(s => s.access) || '';

    const [alreadyScannedError, setAlreadyScannedError] = useState('');
    
    console.log('classrooms', classrooms.length);
    console.log('instructor', instructor);

    const showScanner = classrooms.length === 2 || selectedClassroom !== '0'
    

    const handleSuccess = (decodedText: string) => {

      setAlreadyScannedError('')
        const alreadyScanned = attendances && isAttendanceCreated(attendances, decodedText)

        if (alreadyScanned) {
          setAlreadyScannedError(lan === 'EN' ? 'Student already scanned' : 'Estudiante ya fué escaneado')
          setTimeout(() => {
            setAlreadyScannedError('')
          }, 2000)
          return
        }


        setIsLoading(true);
        console.log(decodedText);
        createAttendance.mutate({
          attendance: {
            status: selectedStatus,
            student: decodedText,
            created_by: `${instructor?.first_name} ${instructor?.last_name}`,
            attendance_type: 'A',
          },
          access,
        }, {
          onSettled: () => setIsLoading(false),
        });
      };

      


  return (
    <div className="w-full">
        <Selector 
            values={attendanceStatus}
            setter={setSelectedStatus}
            defaultValue={selectedStatus}
            label="Status"
        />
        {classrooms.length > 2 && 
        <Selector 
            values={classrooms}
            setter={setSelectedClassroom}
            defaultValue={selectedClassroom}
            label={lan === 'EN' ? 'Classroom' : 'Salón'}
        />}
        {showScanner &&
        <AttendanceScanner 
            onScanSuccess={handleSuccess}
            selectedStatus={selectedStatus}
            classroomId={selectedClassroom}
            setAttendances={setAttendances}
            errorMessage={alreadyScannedError}
        />}
        {isLoading && (
            <div className="text-blue-600 font-semibold mt-4">
            {lan === 'EN' ? 'Creating Attendance...' : 'Creando Asistencia...'}
            </div>
        )}
    </div>
  )
}

export default AttendanceScanForm