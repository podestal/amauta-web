import { useState } from "react"
import useLanguageStore from "../../../hooks/store/useLanguageStore"
import { SimpleAttendance } from "../../../services/api/studentsService"
import getAttendanceLabel from "../../../utils/getAttendanceLabel"
import Modal from "../../ui/Modal"
import AttendanceForm from "./AttendanceForm"
import useUpdateAttendance from "../../../hooks/api/attendance/useUpdateAttendance"
import useCreateAttendance from "../../../hooks/api/attendance/useCreateAttendance"
import AttendanceStatus from "./AttendanceStatus"

interface Props {
    attendance: SimpleAttendance
    studentId: string
    classroomId: string
    kind: string
    canModifyAttendance: boolean
}

const UpdateAttendance = ({ attendance, studentId, classroomId, kind, canModifyAttendance=true}: Props) => {
    
    const [open, setOpen] = useState(false)
    const lan = useLanguageStore(s => s.lan)
    
    
    const attendanceLabel = getAttendanceLabel({ lan, attendance: attendance.status })
    const updateAttendance = useUpdateAttendance({ attendanceId: attendance.id, classroomId })
    const createAttendance = useCreateAttendance({ classroomId }) 

  return (
    <>
        <AttendanceStatus 
            status={attendance.status}
            label={attendanceLabel}
            canModify={canModifyAttendance}
            onClick={() => {
                canModifyAttendance && setOpen(true)}}
        />
        <Modal 
            isOpen={open}
            onClose={() => setOpen(false)}
        >
            {attendance.id ? 
            <AttendanceForm 
                studentId={studentId}
                attendance={attendance}
                updateAttendance={updateAttendance}
                attendanceKind={kind}
                setOpen={setOpen}
            />
            :
            <AttendanceForm 
                studentId={studentId}
                attendance={attendance}
                createAttendance={createAttendance}
                attendanceKind={kind}
                setOpen={setOpen}
            />
            }
        </Modal>
    </>
  )
}

export default UpdateAttendance