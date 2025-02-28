import { useState } from "react"
import Button from "../../ui/Button"
import Modal from "../../ui/Modal"
import ActivityForm from "./ActivityForm"

interface Props {
    area: number
}

const CreateActivity = ({ area }: Props) => {

    const [open, setOpen] = useState(false)

  return (
    <>
        <Button label="➕ Nueva Tarea" onClick={() => setOpen(true)} />
        <Modal
            isOpen={open}
            onClose={() => setOpen(false)}
        >
            <ActivityForm 
                area={area}
            />
        </Modal>
    </>
  )
}

export default CreateActivity