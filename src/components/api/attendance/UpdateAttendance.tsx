import { useState } from "react"
import useLanguageStore from "../../../hooks/store/useLanguageStore"
import { SimpleAttendance } from "../../../services/api/studentsService"
import getAttendanceLabel from "../../../utils/getAttendanceLabel"
import Modal from "../../ui/Modal"
import AttendanceForm from "./AttendanceForm"
import useUpdateAttendance from "../../../hooks/api/attendance/useUpdateAttendance"

interface Props {
    attendance: SimpleAttendance
    studentId: string
    classroomId: string
}

const UpdateAttendance = ({ attendance, studentId, classroomId }: Props) => {

    console.log('attendances', attendance);
    
    const [open, setOpen] = useState(false)
    const lan = useLanguageStore(s => s.lan)
    const attendanceLabel = getAttendanceLabel({ lan, attendance: attendance.status })
    const updateAttendance = useUpdateAttendance({ attendanceId: attendance.id, classroomId })

  return (
    <>
        <p 
            onClick={() => setOpen(true)}
            className={`py-2 text-center font-bold rounded-2xl text-xs
            ${attendance.status === 'O' && 'bg-green-500'}
            ${attendance.status === 'L' && 'bg-amber-500'}
            ${attendance.status === 'N' && 'bg-red-500'}
            ${attendance.status === 'E' && 'bg-green-500'}
            ${attendance.status === 'T' && 'bg-yellow-500'}
            `}>{attendanceLabel}
        </p>
        <Modal 
            isOpen={open}
            onClose={() => setOpen(false)}
        >
            <AttendanceForm 
                studentId={studentId}
                attendance={attendance}
                updateAttendance={updateAttendance}
                attendanceKind="I"
                setOpen={setOpen}
            />
        </Modal>
    </>
  )
}

export default UpdateAttendance