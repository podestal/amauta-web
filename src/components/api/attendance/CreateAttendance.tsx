import { useState } from "react"
import Modal from "../../ui/Modal"
import AttendanceForm from "./AttendanceForm"
import useCreateAttendance from "../../../hooks/api/attendance/useCreateAttendance"

interface Props {
    studentId: string
    classroomId: string
    kind: string
    label: string
}

const CreateAttendance = ({ studentId, classroomId, kind, label }: Props) => {

    const [open, setOpen] = useState(false)
    const createAttendance = useCreateAttendance({ classroomId })

  return (
    <>
    <div className="flex justify-start items-center gap-4">
        <p 
            onClick={() => {
                setOpen(true)}}
            className={`w-full cursor-pointer py-2 px-4 text-center font-bold rounded-2xl text-xs bg-slate-400 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600`}>
                {label}
        </p>
    </div>
    <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
    >
        <AttendanceForm 
            createAttendance={createAttendance}
            studentId={studentId}
            attendanceKind={kind}
            setOpen={setOpen}
        />
    </Modal>
    </>
  )
}

export default CreateAttendance