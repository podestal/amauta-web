import { useState } from "react"
import Button from "../../ui/Button"
import Modal from "../../ui/Modal"
import useLanguageStore from "../../../hooks/store/useLanguageStore"
import TextArea from "../../ui/TextArea"

const CreateAttendance = () => {

    const [open, setOpen] = useState(false)
    const lan = useLanguageStore(s => s.lan)

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
        <div className="flex flex-col gap-6 justify-center items-center">
            <h2 className="text-xl">{lan === 'EN' ? 'Register Attendance' : 'Registar Asistencia'}</h2>
            <p>Status</p>
            <TextArea 
                placeholder={lan === 'EN' ? 'Observations' : 'Observaciones'}
            />
            <Button 
                label={lan === 'EN' ? 'Register' : 'Registrar'}
            />
        </div>
    </Modal>
    </>
  )
}

export default CreateAttendance