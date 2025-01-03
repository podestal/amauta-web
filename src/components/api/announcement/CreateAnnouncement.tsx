import useCreateAnnouncement from "../../../hooks/api/announcement.ts/useCreateAnnouncement"
import { Student } from "../../../services/api/studentsService"
import AnnouncementForm from "./AnnouncementForm"

interface Props {
    student: Student
}

const CreateAnnouncement = ({ student }: Props) => {

    const CreateAnnouncement = useCreateAnnouncement({ studentId: student.uid })

  return (
    <AnnouncementForm 
        CreateAnnouncement={CreateAnnouncement}
        student={student}
    />
  )
}

export default CreateAnnouncement