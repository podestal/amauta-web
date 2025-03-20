import useCreateAnnouncement from "../../../hooks/api/announcement.ts/useCreateAnnouncement"
import useSchoolStore from "../../../hooks/store/useSchoolStore"
import { Student } from "../../../services/api/studentsService"
import AnnouncementForm from "./AnnouncementForm"

interface Props {
    student?: Student
    classroom?: number
    visibility: 'C' | 'P'
}

const CreateAnnouncement = ({ student, classroom, visibility }: Props) => {

    const school = useSchoolStore(s => s.school).id.toString()
    const CreateAnnouncement = useCreateAnnouncement({ school })

  return (
    <AnnouncementForm 
        CreateAnnouncement={CreateAnnouncement}
        student={student}
        classroom={classroom}
        visibility={visibility}
    />
  )
}

export default CreateAnnouncement