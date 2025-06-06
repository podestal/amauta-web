import { Assignature } from "../../../services/api/assignatureService"
import { areas } from "../../../data/mockdataForGrades"
import Slider from "../../ui/Slider"
import { useState } from "react"
import AssignatureForm from "./AssignatureForm"
import { Pen } from "lucide-react"
import useUpdateAssignature from "../../../hooks/api/assignature/useUpdateAssignature"

interface Props {
    assignature: Assignature
}

const AssignatureAdminCard = ({ assignature }: Props) => {

    const [open, setOpen] = useState(false)
    const updateAssignature = useUpdateAssignature({ assignatureId: assignature.id, classroomId: assignature.clase })

  return (
    <>
        <li 
            key={assignature.id} 
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex justify-between items-center">
            <div className="flex items-center justify-center gap-2">
                <Pen 
                    size={16} 
                    className="text-blue-600 hover:text-blue-700 cursor-pointer mr-2"
                    onClick={() => setOpen(true)}
                />
                <h3 className="text-md font-semibold">{assignature.title}</h3>
            </div>
            <p>{areas.find( area => area.id === assignature.area)?.title || ''}</p>
        </li>
        <Slider
            isOpen={open}
            setOpen={setOpen}
        >
            <AssignatureForm 
                classroomId={assignature.clase}
                assignature={assignature}
                updateAssignature={updateAssignature}
            />
        </Slider>
    </>
  )
}

export default AssignatureAdminCard