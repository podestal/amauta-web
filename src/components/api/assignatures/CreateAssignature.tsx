import { Plus } from "lucide-react"
import Slider from "../../ui/Slider"
import { useState } from "react"
import AssignatureForm from "./AssignatureForm"
import useCreateAssignature from "../../../hooks/api/assignature/useCreateAssignature"

interface Props {
    classroomId: number
}

const CreateAssignature = ({ classroomId }: Props) => {


    const [open, setOpen] = useState(false)
    const createAssignature = useCreateAssignature()

  return (
    <>
        <button 
            onClick={() => setOpen(true)}
            className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded flex items-center gap-1">
            <Plus size={16} /> <span className="hidden sm:inline">Agregar Curso</span>
        </button>
        <Slider 
            isOpen={open}
            setOpen={setOpen}
        >
            <AssignatureForm 
                classroomId={classroomId}
                createAssignature={createAssignature}
            />
        </Slider>
    </>
  )
}

export default CreateAssignature