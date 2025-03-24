import { useState } from "react"
import useCreateTutorContacted from "../../../../hooks/api/tutorContact/useCreateTutorContacted"
import useAuthStore from "../../../../hooks/store/useAuthStore"
import useNotificationsStore from "../../../../hooks/store/useNotificationsStore"
import useSchoolStore from "../../../../hooks/store/useSchoolStore"
import { StudentByAgendas } from "../../../../services/api/studentsService"
import Button from "../../../ui/Button"

interface Props {
    student: StudentByAgendas
    classroom: string
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const StudentMarkContacted = ({ student, classroom, setOpen }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const user = useAuthStore(s => s.userId)
    const school = useSchoolStore(s => s.school).id
    const [loading, setLoading] = useState(false)
    const { setMessage, setShow, setType } = useNotificationsStore()
    

    const createTutorContacted = useCreateTutorContacted({ school: school.toString(), classroom})
    
    const handleCreate = () => {
        setLoading(true)
        createTutorContacted.mutate({
            access,
            tutorContacted: {
                student: student.uid,
                created_by: user,

            }
        }, {
            onSuccess: () => {
                setMessage('Alumno marcado como contactado')
                setType('success')
                setShow(true)
                setOpen(false)
            },
            onError: () => {
                setMessage('Error al crear el contacto')
                setType('error')
                setShow(true)
            },
            onSettled: () => setLoading(false)
        })
    }
  return (
    <Button 
        label="Marcar como contactado"
        disable={student.filtered_read_agendas || student.filtered_tutor_contact}
        onClick={handleCreate}
        loading={loading}
        minWidth
    />
  )
}

export default StudentMarkContacted