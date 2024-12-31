import { useState } from "react"
import Button from "../../ui/Button"
import Modal from "../../ui/Modal"
import AttendanceForm from "./AttendanceForm"
import useCreateAttendance from "../../../hooks/api/attendance/useCreateAttendance"

interface Props {
    studentId: number
    instructor: string
}

const CreateAttendance = ({ studentId, instructor }: Props) => {

    const [open, setOpen] = useState(false)
    const createAttendance = useCreateAttendance()

  return (
    <>
    <div className="w-full text-center p-2">
        <Button 
            label="Registrar"
            onClick={() => setOpen(true)}
        />
    </div>
    <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
    >
        <AttendanceForm 
            createAttendance={createAttendance}
            studentId={studentId}
            instructor={instructor}
        />
    </Modal>
    </>
  )
}

export default CreateAttendance