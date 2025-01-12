import { useState } from "react"
import Modal from "../../ui/Modal"
import AttendanceForm from "./AttendanceForm"
import useCreateAttendance from "../../../hooks/api/attendance/useCreateAttendance"
import useLanguageStore from "../../../hooks/store/useLanguageStore"

interface Props {
    studentId: string
    classroomId: string
}

const CreateAttendance = ({ studentId, classroomId }: Props) => {

    const [open, setOpen] = useState(false)
    const createAttendance = useCreateAttendance({ classroomId })
    const lan = useLanguageStore(s => s.lan)

  return (
    <>
    <div className="w-full text-center">
        <p 
            onClick={() => setOpen(true)}
            className={`w-full py-2 px-4 text-center font-bold rounded-2xl text-xs bg-slate-400 dark:bg-slate-700`}>
                {lan === 'EN' ? 'Register' : 'Registrar'}
        </p>
    </div>
    <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
    >
        <AttendanceForm 
            createAttendance={createAttendance}
            studentId={studentId}
        />
    </Modal>
    </>
  )
}

export default CreateAttendance