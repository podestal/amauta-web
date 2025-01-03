import { RiChat1Fill } from "@remixicon/react"
import Modal from "../../ui/Modal"
import { useState } from "react"
import useCreateAnnouncement from "../../../hooks/api/announcement.ts/useCreateAnnouncement"
import { Student } from "../../../services/api/studentsService"
import AnnouncementForm from "./AnnouncementForm"

interface Props {
    student: Student
}

const CreateAnnouncement = ({ student }: Props) => {

    const [open, setOpen] = useState(false)
    const CreateAnnouncement = useCreateAnnouncement({ studentId: student.uid })

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
            <AnnouncementForm 
                CreateAnnouncement={CreateAnnouncement}
                student={student}
            />
        </Modal>
    </>
  )
}

export default CreateAnnouncement