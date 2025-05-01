import { useState } from "react"
import Button from "../../ui/Button"
import Modal from "../../ui/Modal"
import ActivityForm from "./ActivityForm"
import useCreateActivity from "../../../hooks/api/activity/useCreateActivity"
import MultiOptionSwitch from "../../ui/MultiOptionSwitch"
import useGetLessonsByAssignature from "../../../hooks/api/lesson/useGetLessonByAssignature"
import useAuthStore from "../../../hooks/store/useAuthStore"
import ActivityFormAI from "./forms/ActivityFormAI"
import getCurrentQuarter from "../../../utils/getCurrentCuarter"

interface Props {
    area: number
    assignatureId: string
    selectedQuarter: string
    classroom: string
}

const CreateActivity = ({ area, assignatureId, selectedQuarter }: Props) => {

    const [open, setOpen] = useState(false)
    const access = useAuthStore(s => s.access) || ''
    const createActivity = useCreateActivity({ assignatureId, quarter:selectedQuarter })
    const [selected, setSelected] = useState(0)
    const { data: lessons, isLoading, isError, error, isSuccess } = useGetLessonsByAssignature({ access, assignatureId, quarter: getCurrentQuarter() })

    if (isLoading) return <p className="text-center animate-pulse">Cargando...</p>

    if (isError) return <p className="text-center text-red-500">Error: {error.message}</p>

    if (isSuccess)

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
            {selected === 1 && <ActivityFormAI 
                lessons={lessons}

            />}
        </Modal>
    </>
  )
}

export default CreateActivity