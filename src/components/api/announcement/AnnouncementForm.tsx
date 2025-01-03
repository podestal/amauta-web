import { UseMutationResult } from "@tanstack/react-query"
import { Announcement } from "../../../services/api/announcementService"
import { CreateAnnouncementData } from "../../../hooks/api/announcement.ts/useCreateAnnouncement"
import Input from "../../ui/Input"
import useLanguageStore from "../../../hooks/store/useLanguageStore"
import { useState } from "react"
import TextArea from "../../ui/TextArea"
import useAuthStore from "../../../hooks/store/useAuthStore"
import { Student } from "../../../services/api/studentsService"
import Button from "../../ui/Button"
import useNotificationsStore from "../../../hooks/store/useNotificationsStore"

interface Props {
    CreateAnnouncement: UseMutationResult<Announcement, Error, CreateAnnouncementData>
    student: Student
}

const AnnouncementForm = ({ CreateAnnouncement, student }: Props) => {

    const lan = useLanguageStore(s => s.lan)
    const access = useAuthStore(s => s.access) || ''
    const { setType, setShow, setMessage } = useNotificationsStore()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const [titleError, setTitleError] = useState('')
    const [descriptionError, setDescriptionError] = useState('')

    const [loading, setLoading] = useState(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!title) {
            setTitleError(lan === 'EN' ? 'Title is required' : 'Título es requerido')
            return
        }

        if (!description) {
            setDescriptionError(lan === 'EN' ? 'Description is required' : 'Descripción es requerida')
            return
        }

        setLoading(true)
        
        CreateAnnouncement.mutate(
            {
                access,
                announcement: {
                    title,
                    description,
                    student: student.uid
                }
            },
            {
                onSuccess: () => {
                    setType('success')
                    setShow(true)
                    setMessage(lan === 'EN' ? 'Announcement created' : 'Anuncio creado')
                    setTitle('')
                    setDescription('')
                }, onError: error => {
                    setType('error')
                    setShow(true)
                    setMessage(error.message)
                }, onSettled: () => setLoading(false)
            }
        )
    }

  return (
    <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center item-start gap-6 w-[60%] mx-auto"
    >
        <h2 className="text-2xl text-center">{lan === 'EN' ? 'New Message' : 'Nuevo Mensaje'}</h2>
        <Input 
            placeholder={lan === 'EN' ? 'Title' : 'Título'}
            value={title}
            onChange={e => {
                title && setTitleError('')
                setTitle(e.target.value)}}
            error={titleError}
        />
        <TextArea 
            placeholder={lan === 'EN' ? 'Description' : 'Descripción'}
            value={description}
            onChange={e => {
                description && setDescriptionError('')
                setDescription(e.target.value)}}
            error={descriptionError}
        />
        <Button 
            label={lan === 'EN' ? 'Send' : 'Enviar'}
            loading={loading}
        />
    </form>
  )
}

export default AnnouncementForm