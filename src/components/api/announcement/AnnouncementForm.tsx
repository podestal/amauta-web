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
import { AnimatePresence, motion } from "framer-motion"
import useSchoolStore from "../../../hooks/store/useSchoolStore"
import Checkbox from "../../ui/Checkbox"

interface Props {
    CreateAnnouncement: UseMutationResult<Announcement, Error, CreateAnnouncementData>
    student?: Student
    classroom?: number
    visibility: 'C' | 'P'
}

interface CardProps {
    children: React.ReactNode
    className?: string
}

const Card = ({ children, className }: CardProps) => (
    <div className={`p-4 rounded-xl shadow-lg ${className}`}>
        {children}
    </div>
);

// interface CheckboxProps {
//     checked: boolean
//     onCheckedChange: (checked: boolean) => void
// }

// const Checkbox = ({ checked, onCheckedChange }: CheckboxProps) => (
//     <input 
//         type="checkbox" 
//         checked={checked} 
//         onChange={(e) => onCheckedChange(e.target.checked)} 
//         className="w-5 h-5 cursor-pointer"
//     />
// );


const AnnouncementForm = ({ CreateAnnouncement, student, classroom, visibility }: Props) => {

    const lan = useLanguageStore(s => s.lan)
    const access = useAuthStore(s => s.access) || ''
    const user = useAuthStore(s => s.userId)
    const school = useSchoolStore(s => s.school).id
    const { setType, setShow, setMessage } = useNotificationsStore()
    

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [selectedType, setSelectedType] = useState<'I' | 'A' | 'E' | ''>('')
    const [sendWhatsApp, setSendWhatsApp] = useState(false);
    const [doubleCheck, setDoubleCheck] = useState(false)

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
        <AnimatePresence>
            {sendWhatsApp && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                    className="mb-4"
                >
                    <Card className="w-[85%] mx-auto lg:w-[60%] bg-red-600 text-white text-center mb-4">
                        <p>{lan === 'EN' ? "Warning: Sending a WhatsApp message has a cost." : "Advertencia: Enviar un mensaje de WhatsApp tiene un costo."}</p>
                    </Card>
                </motion.div>
            )}
        </AnimatePresence>
        <form
            onSubmit={handleSubmit}
            className=" relative flex flex-col justify-center item-start gap-6 w-[85%] lg:w-[60%] mx-auto bg-slate-800 px-8 py-6 rounded-xl"
        >
            <h2 className="text-2xl text-center">{lan === 'EN' ? 'New Message' : 'Nuevo Mensaje'}</h2>
            {visibility === 'P' && 
            <div className="w-full flex justify-center">
                <Checkbox 
                    checked={sendWhatsApp}
                    onChange={setSendWhatsApp}
                    label="Enviar por WhatsApp"
                />
            </div>}
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
            {doubleCheck && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                    className="my-4"
                >
                    <Card className="w-full mx-auto bg-red-600 text-white text-center mb-4">
                        <p>Está seguro?</p>
                        <p>{lan === 'EN' ? "Warning: Sending a WhatsApp message has a cost." : "esta acción es irreversible."}</p>
                    </Card>
                </motion.div>
            )}
            <div className="w-full flex justify-center">
                {sendWhatsApp ? 
                <Button 
                    label={lan === 'EN' ? 'Send' : 'Enviar'}
                    loading={loading}
                    minWidth
                    type="button"
                    onClick={() => {
                        setDoubleCheck(true)
                        setTimeout(() => {
                            setSendWhatsApp(false)
                        }
                        , 100)
                    }}
                /> 
                : 
                <Button 
                    label={lan === 'EN' ? 'Send' : 'Enviar'}
                    loading={loading}
                    minWidth
                    onClick={() => console.log('Send')}
                />}
            </div>
        </form>
    </motion.div>
  )
}

export default AnnouncementForm