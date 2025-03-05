import { useState } from "react"
import Button from "../../ui/Button"
import Modal from "../../ui/Modal"
import ActivityForm from "./ActivityForm"
import useCreateActivity from "../../../hooks/api/activity/useCreateActivity"

interface Props {
    area: number
    assignatureId: string
    selectedQuarter: string
}

const CreateActivity = ({ area, assignatureId, selectedQuarter }: Props) => {

    const [open, setOpen] = useState(false)
    const createActivity = useCreateActivity({ assignatureId, quarter:selectedQuarter })

  return (
    <>
        <Button label="➕ Nueva Tarea" onClick={() => setOpen(true)} />
        <Modal
            isOpen={open}
            onClose={() => setOpen(false)}
        >
            <ActivityForm 
                area={area}
                createActivity={createActivity}
                assignatureId={assignatureId}
                setOpen={setOpen}
            />
        </Modal>
    </>
  )
}

export default CreateActivity