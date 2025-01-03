import { RiChat1Fill } from "@remixicon/react"
import Modal from "../../ui/Modal"
import { useState } from "react"


const CreateAnnouncement = () => {

    const [open, setOpen] = useState(false)

  return (
    <>
        <RiChat1Fill 
            onClick={() => setOpen(true)}
            className="text-2xl text-blue-700 cursor-pointer hover:text-blue-600"
        />
        <Modal
            isOpen={open}
            onClose={() => setOpen(false)}
        >
            <div>
                <h2>Nuevo Mensaje</h2>
            </div>
        </Modal>
    </>
  )
}

export default CreateAnnouncement