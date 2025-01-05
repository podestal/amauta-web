import { useState } from "react";
import useInstructorStore from "../../../hooks/store/useInstructorStore";
import QRScanner from "../../ui/QRScanner"
import Selector from "../../ui/Selector"
import useLanguageStore from "../../../hooks/store/useLanguageStore";
import { getAttendanceStatus, getInstructorClassrooms } from "../../../utils/data";
import useAuthStore from "../../../hooks/store/useAuthStore";
import { CreateAttendanceData } from "../../../hooks/api/attendance/useCreateAttendance";
import { Attendance } from "../../../services/api/attendanceService";
import { UseMutationResult } from "@tanstack/react-query";

interface Props {
    createAttendance: UseMutationResult<Attendance, Error, CreateAttendanceData>
    selectedClassroom: string
    setSelectedClassroom: React.Dispatch<React.SetStateAction<string>>
}

const AttendanceScanForm = ({ createAttendance, selectedClassroom, setSelectedClassroom }: Props) => {
    
    const instructor = useInstructorStore(s => s.instructor);
    const [selectedStatus, setSelectedStatus] = useState('0');
    const [isLoading, setIsLoading] = useState(false);
    const lan = useLanguageStore(s => s.lan);
    const attendanceStatus = getAttendanceStatus(lan);
    const classrooms = instructor ? getInstructorClassrooms(instructor.clases_details, lan) : []
    const access = useAuthStore(s => s.access) || '';

    const handleSuccess = (decodedText: string) => {
        setIsLoading(true);
        console.log(decodedText);
        createAttendance.mutate({
          attendance: {
            status: selectedStatus,
            student: decodedText,
            created_by: `${instructor?.first_name} ${instructor?.last_name}`,
          },
          access,
        }, {
          onSettled: () => setIsLoading(false),
        });
      };


  return (
    <div>
        <Selector 
            values={attendanceStatus}
            setter={setSelectedStatus}
            defaultValue={selectedStatus}
            label="Status"
        />
        {classrooms.length > 0 && 
        <Selector 
            values={classrooms}
            setter={setSelectedClassroom}
            defaultValue={selectedClassroom}
            label={lan === 'EN' ? 'Classroom' : 'Salón'}
        />}
        <QRScanner 
            onScanSuccess={handleSuccess}
            selectedStatus={selectedStatus}
        />
        {isLoading && (
            <div className="text-blue-600 font-semibold mt-4">
            {lan === 'EN' ? 'Creating Attendance...' : 'Creando Asistencia...'}
            </div>
        )}
    </div>
  )
}

export default AttendanceScanForm