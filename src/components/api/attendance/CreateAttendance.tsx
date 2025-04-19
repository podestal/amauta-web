import { useState } from "react"
import Modal from "../../ui/Modal"
import AttendanceForm from "./AttendanceForm"
import useCreateAttendance from "../../../hooks/api/attendance/useCreateAttendance"

interface Props {
    studentId: string
    classroomId: string
    kind: string
    label: string
    canModifyAttendance: boolean
}

const CreateAttendance = ({ studentId, classroomId, kind, label, canModifyAttendance=true }: Props) => {

    const [open, setOpen] = useState(false)
    const createAttendance = useCreateAttendance({ classroomId })

  return (
    <>
    <div className="flex justify-start items-center gap-4">
    <p
        onClick={() => canModifyAttendance && setOpen(true)}
        className={`w-full cursor-pointer py-4 px-6 text-center font-semibold text-sm rounded-xl bg-gradient-to-r dark:text-slate-50 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 from-gray-100 via-gray-200 to-gray-300`}
    >
        <span className="flex items-center justify-center gap-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
            >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25M8.25 9V5.25M3 12h18M4.5 18h15"
            />
            </svg>
            {label}
        </span>
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