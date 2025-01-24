import { RiChat1Fill } from "@remixicon/react"
import Modal from "../../ui/Modal"
import { useState } from "react"
import CreateAnnouncement from "./CreateAnnouncement"
import { Student } from "../../../services/api/studentsService"
import AnnouncementsList from "./AnnouncementsList"
import Tabs from "../../ui/Tabs"
import useLanguageStore from "../../../hooks/store/useLanguageStore"

interface Props {
    student: Student
}

const Announcements = ({ student }: Props) => {

    const lan = useLanguageStore(s => s.lan)
    const [open, setOpen] = useState(false)

  return (
    <>
        <RiChat1Fill 
            onClick={() => setOpen(true)}
            className="text-blue-700 cursor-pointer hover:text-blue-600"
            size={30}
        />
        <Modal
            isOpen={open}
            onClose={() => setOpen(false)}
        >
            <>

                <Tabs 
                    tabs={[
                        {
                            label: lan === 'EN' ? 'Announcements' : 'Mensajes',
                            content: <AnnouncementsList 
                                student={student}
                                open={open} />
                        },
                        {
                            label: lan === 'EN' ? 'Create Announcement' : 'Crear Mensaje',
                            content: <CreateAnnouncement 
                                student={student} />
                        }
                    ]}
                />
            </>
        </Modal>
    </>
  )
}

export default Announcements