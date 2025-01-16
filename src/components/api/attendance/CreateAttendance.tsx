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
    const [attendanceKind, setAttendanceKind] = useState('')
    const lan = useLanguageStore(s => s.lan)

  return (
    <>
    <div className="w-[80%] flex justify-start items-center gap-4">
        <p 
            onClick={() => {
                setAttendanceKind('I')
                setOpen(true)}}
            className={`w-full cursor-pointer py-2 px-4 text-center font-bold rounded-2xl text-xs bg-slate-400 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600`}>
                {lan === 'EN' ? 'Register Entance' : 'Registrar Entrada'}
        </p>
        <p 
            onClick={() => {
                setAttendanceKind('O')
                setOpen(true)}}
            className={`w-full cursor-pointer py-2 px-4 text-center font-bold rounded-2xl text-xs bg-slate-400 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600`}>
                {lan === 'EN' ? 'Register Exit' : 'Registrar Salida'}
        </p>
    </div>
    <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
    >
        <AttendanceForm 
            createAttendance={createAttendance}
            studentId={studentId}
            attendanceKind={attendanceKind}
        />
    </Modal>
    </>
  )
}

export default CreateAttendance