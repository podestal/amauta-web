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
import { motion } from "framer-motion"
import useSchoolStore from "../../../hooks/store/useSchoolStore"

interface Props {
    CreateAnnouncement: UseMutationResult<Announcement, Error, CreateAnnouncementData>
    student?: Student
    classroom?: number
    visibility: 'C' | 'P'
}

const AnnouncementForm = ({ CreateAnnouncement, student, classroom, visibility }: Props) => {

    const lan = useLanguageStore(s => s.lan)
    const access = useAuthStore(s => s.access) || ''
    const user = useAuthStore(s => s.userId)
    const school = useSchoolStore(s => s.school).id
    const { setType, setShow, setMessage } = useNotificationsStore()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [selectedType, setSelectedType] = useState<'I' | 'A' | 'E' | ''>('')

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

        const studentUid = student?.uid

        setLoading(true)
        
        CreateAnnouncement.mutate(
            {
                access,
                announcement: {
                    title,
                    description,
                    created_by: user,
                    school,
                    announcement_type: selectedType,
                    visibility_level: visibility,
                    students: studentUid ? [parseInt(studentUid)] : [],
                    clases: classroom ? [classroom] : []
                }
            },
            {
                onSuccess: () => {
                    setType('success')
                    setShow(true)
                    setMessage(lan === 'EN' ? 'Announcement created' : 'Anuncio creado')
                    setTitle('')
                    setDescription('')
                    setSelectedType('')
                }, onError: error => {
                    setType('error')
                    setShow(true)
                    setMessage(error.message)
                }, onSettled: () => setLoading(false)
            }
        )
    }

  return (
    <motion.div
        initial={{ y: "-100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }}
    >
        <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center item-start gap-6 w-[85%] lg:w-[60%] mx-auto bg-slate-800 px-8 py-6 rounded-xl"
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
            <div className="flex flex-col gap-4 items-center justify-start">
                <p>Tipo de anuncio</p>
                <div className="lg:w-[70%] w-[80%] flex flex-col gap-4 text-center">
                    <p 
                        onClick={() => selectedType === '' ? setSelectedType('I') : setSelectedType('')} 
                        className={`${selectedType === 'I' ? 'bg-blue-600' : 'bg-gray-500'} max-lg:text-xs text-sm py-2 rounded-2xl cursor-pointer hover:bg-blue-700 transition-all duration-300`}
                    >Informativo</p>
                    <p
                        onClick={() => selectedType === '' ? setSelectedType('A') : setSelectedType('')} 
                        className={`${selectedType === 'A' ? 'bg-yellow-500' : 'bg-gray-500'} max-lg:text-xs text-sm py-2 rounded-2xl cursor-pointer hover:bg-yellow-600 transition-all duration-300`}
                    >Atención</p>
                    <p
                        onClick={() => selectedType === '' ? setSelectedType('E') : setSelectedType('')} 
                        className={`${selectedType === 'E' ? 'bg-red-600' : 'bg-gray-500'} max-lg:text-xs text-sm py-2 rounded-2xl cursor-pointer hover:bg-red-700 transition-all duration-300`}
                    >Emergencia</p>
                </div>
            </div>
            <div className="w-full flex justify-center">
                <Button 
                    label={lan === 'EN' ? 'Send' : 'Enviar'}
                    loading={loading}
                    minWidth
                />
            </div>
        </form>
    </motion.div>
  )
}

export default AnnouncementForm