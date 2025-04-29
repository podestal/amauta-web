import { useState } from "react"
import Button from "../../ui/Button"
import Modal from "../../ui/Modal"
import ActivityForm from "./ActivityForm"
import useCreateActivity from "../../../hooks/api/activity/useCreateActivity"
import MultiOptionSwitch from "../../ui/MultiOptionSwitch"

interface Props {
    area: number
    assignatureId: string
    selectedQuarter: string
    classroom: string
}

const CreateActivity = ({ area, assignatureId, selectedQuarter }: Props) => {

    const [open, setOpen] = useState(false)
    const createActivity = useCreateActivity({ assignatureId, quarter:selectedQuarter })
    const [selected, setSelected] = useState(0)

  return (
    <>
        <div className="flex justify-center items-center">
            <Button label="➕ Nueva Actividad" onClick={() => setOpen(true)} />
        </div>
        <Modal
            isOpen={open}
            onClose={() => setOpen(false)}
            whole
        >
            {/* <ActivityForm 
                area={area}
                createActivity={createActivity}
                assignatureId={assignatureId}
                setOpen={setOpen}
            /> */}
            <MultiOptionSwitch 
                options={['Normal', 'AI']}
                selected={selected}
                setSelected={setSelected}
            />
            {selected === 0 && <ActivityForm 
                area={area}
                createActivity={createActivity}
                assignatureId={assignatureId}
                setOpen={setOpen}
            />}
            {selected === 1 && <p>Con ai</p>}
        </Modal>
    </>
  )
}

export default CreateActivity