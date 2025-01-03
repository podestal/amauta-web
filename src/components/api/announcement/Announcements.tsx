import { RiChat1Fill } from "@remixicon/react"
import Modal from "../../ui/Modal"
import { useState } from "react"
import CreateAnnouncement from "./CreateAnnouncement"
import { Student } from "../../../services/api/studentsService"
import AnnouncementsList from "./AnnouncementsList"

interface Props {
    student: Student
}

const Announcements = ({ student }: Props) => {

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
            <>
                <CreateAnnouncement 
                    student={student}
                />
                <AnnouncementsList 
                    student={student}
                    open={open}
                />
            </>
        </Modal>
    </>
  )
}

export default Announcements