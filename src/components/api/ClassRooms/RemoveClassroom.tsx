import { RiDeleteBin7Fill } from "@remixicon/react"
import { Classroom } from "../../../services/api/classroomService"
import Modal from "../../ui/Modal"
import { useState } from "react"
import Button from "../../ui/Button"

interface Props {
    classroom: Classroom
}

const RemoveClassroom = ({ classroom }: Props) => {

    const [open, setOpen] = useState(false)

  return (
    <>
    <RiDeleteBin7Fill 
        className="absolute top-2 right-2 text-red-500 w-6 h-6 cursor-pointer hover:text-red-600 z-20"
        onClick={() => setOpen(true)}
    />
    <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
    >
        <div className="flex flex-col justify-start items-center gap-2 p-4">
            <h2 className="text-xl font-bold">Está seguro de eliminar esta clase?</h2>
            <p className="text-slate-300">Esta acción no se puede deshacer</p>
            <div className="flex justify-center items-center gap-12 mt-8">
                <Button 
                    label="Eliminar"
                    onClick={() => console.log('Eliminando...')}
                    color="red"
                />
                <Button
                    label="Cancelar"
                    onClick={() => setOpen(false)}
                />
            </div>
        </div>
    </Modal>
    </>
  )
}

export default RemoveClassroom