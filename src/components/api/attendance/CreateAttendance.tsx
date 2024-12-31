import { useState } from "react"
import Button from "../../ui/Button"
import Modal from "../../ui/Modal"
import AttendanceForm from "./AttendanceForm"

const CreateAttendance = () => {

    const [open, setOpen] = useState(false)

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
        <AttendanceForm />
    </Modal>
    </>
  )
}

export default CreateAttendance