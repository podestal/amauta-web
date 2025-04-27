
// ANNOUNCEMENT_TYPES = [
//     ("I", "Informative"),
//     ("A", "Attention"),
//     ("E", "Emergency"),
// ]

import { useState } from "react"
import Input from "../../ui/Input"
import TextArea from "../../ui/TextArea"
import ClassroomsSelector from "../ClassRooms/ClassroomsSelector"
import { Classroom } from "../../../services/api/classroomService"
import useAuthStore from "../../../hooks/store/useAuthStore"
import useSchoolStore from "../../../hooks/store/useSchoolStore"
import { UseMutationResult } from "@tanstack/react-query"
import { Announcement } from "../../../services/api/announcementService"
import { CreateAnnouncementData } from "../../../hooks/api/announcement.ts/useCreateAnnouncement"
import useNotificationsStore from "../../../hooks/store/useNotificationsStore"
import StudentSelector from "../Students/StudentSelector"
import { Student } from "../../../services/api/studentsService"

// VISIBILITY_LEVELS = [
//     ("G", "General"),    
//     ("C", "Clase"),    
//     ("A", "Assignature"),     
//     ("P", "Personal"),     
// ]

// title = models.CharField(max_length=255)
// description = models.TextField()
// created_at = models.DateField(auto_now_add=True)
// announcement_type = models.CharField(max_length=1, choices=ANNOUNCEMENT_TYPES, default='I')
// visibility_level = models.CharField(max_length=1, choices=VISIBILITY_LEVELS, default='G')

// # Relationships
// school = models.ForeignKey(School, on_delete=models.CASCADE, related_name="announcements")
// clase = models.ForeignKey(Clase, on_delete=models.CASCADE, null=True, blank=True, related_name="announcements") 
// assignature = models.ForeignKey(Assignature, on_delete=models.CASCADE, null=True, blank=True, related_name="announcements")  
// student = models.ManyToManyField(Student, null=True, blank=True, related_name="announcements") 
// created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)

interface Props {
    classrooms: Classroom[]
    createAnnouncement?: UseMutationResult<Announcement, Error, CreateAnnouncementData>
}

const AnnouncementAdminForm = ({ classrooms, createAnnouncement }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const user = useAuthStore(s => s.userId)
    const school = useSchoolStore(s => s.school).id
    const { setMessage, setShow, setType } = useNotificationsStore()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [selectedType, setSelectedType] = useState<'I' | 'A' | 'E' | ''>('')
    const [selectedLevel, setSelectedLevel] = useState<'G' | 'C' | 'A' | 'P' | ''>('')
    const [selectedClassrooms, setSelectedClassrooms] = useState<number[]>([])
    const [selectedStudents, setSelectedStudents] = useState<Student[]>([])

    // Student selector
    const [name, setName] = useState('')
    const [nameError, setNameError] = useState('')

    // Error handling
    const [titleError, setTitleError] = useState('')
    const [descriptionError, setDescriptionError] = useState('')

    const handleCreateAnnouncement = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (title === '') {
            setTitleError('El título es requerido')
            return
        }

        if (description === '') {
            setDescriptionError('La descripción es requerida')
            return
        }

        if (selectedType === '') {
            setMessage('El tipo de anuncio es requerido')
            setType('error')
            setShow(true)
            return
        }

        if (selectedLevel === '') {
            setMessage('El nivel de visibilidad es requerido')
            setType('error')
            setShow(true)
            return
        }

        createAnnouncement && createAnnouncement.mutate({
            access,
            announcement: {
                title,
                description,
                created_by: user,
                school,
                announcement_type: selectedType,
                visibility_level: selectedLevel,
                clases: selectedClassrooms,
                students: selectedStudents.map(s => parseInt(s.uid))
            }
        }, {
            onSuccess: () => {
                setTitle('')
                setDescription('')
                setSelectedType('')
                setSelectedLevel('')
                setSelectedClassrooms([])
                setMessage('Anuncio creado correctamente')
                setType('success')
                setShow(true)
            },
            onError: (err) => {
                setMessage(err.message)
                setType('error')
                setShow(true)
            }
        })

    }
    

    // ['id', 'title', 'description', 'students', 'created_by', 'school', 'clases', 'assignature', 'announcement_type', 'visibility_level']

        // look students by name or dni when student is clicked

  return (
    <form onSubmit={handleCreateAnnouncement} className="w-full flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center">Nuevo Anuncio</h2>
        <Input 
            value={title}
            onChange={(e) => {
                title && setTitleError('')
                setTitle(e.target.value)}}
            placeholder="Título" 
            error={titleError}
            setError={setTitleError}
        />
            
        <TextArea 
            value={description}
            onChange={(e) => {
                description && setDescriptionError('')
                setDescription(e.target.value)}}
            placeholder="Descripción ..." 
            error={descriptionError}
            
        />

        <div className="flex flex-col gap-4 items-center justify-start">
            <p>Tipo de anuncio</p>
            <div className="w-full grid grid-cols-3 gap-4 text-center">
                <p 
                    onClick={() => selectedType === '' ? setSelectedType('I') : setSelectedType('')} 
                    className={`${selectedType === 'I' ? 'bg-blue-600 text-slate-50' : 'dark:bg-gray-500 bg-gray-300'} py-2 rounded-2xl cursor-pointer hover:bg-blue-700 hover:text-slate-50 transition-all duration-300`}
                >Informativo</p>
                <p
                    onClick={() => selectedType === '' ? setSelectedType('A') : setSelectedType('')} 
                    className={`${selectedType === 'A' ? 'bg-yellow-500 text-slate-50' : 'dark:bg-gray-500 bg-gray-300'} py-2 rounded-2xl cursor-pointer hover:bg-yellow-600 hover:text-slate-50 transition-all duration-300`}
                >Atención</p>
                <p
                    onClick={() => selectedType === '' ? setSelectedType('E') : setSelectedType('')} 
                    className={`${selectedType === 'E' ? 'bg-red-600 text-slate-50' : 'dark:bg-gray-500 bg-gray-300'} py-2 rounded-2xl cursor-pointer hover:bg-red-700 hover:text-slate-50 transition-all duration-300`}
                >Emergencia</p>
            </div>
        </div>
        <div className="flex flex-col gap-4 items-center justify-start">
            <p>Dirigido a</p>
            <div className="w-full grid grid-cols-3 gap-4 text-center">
                <p 
                    onClick={() => {
                        if (selectedLevel === '') {
                            setSelectedLevel('G')
                        } else {
                            setSelectedLevel('')
                            setSelectedClassrooms([])
                            setSelectedStudents([])
                        }
                    }} 
                    className={`${selectedLevel === 'G' ? 'bg-green-600 text-slate-50' : 'dark:bg-gray-500 bg-gray-300'} py-2 rounded-2xl cursor-pointer hover:bg-green-700 hover:text-slate-50 transition-all duration-300`}
                >Todos</p>
                <p
                    onClick={() => {
                        // selectedLevel === '' ? setSelectedLevel('C') : setSelectedLevel('')
                        if (selectedLevel === '') {
                            setSelectedLevel('C')
                        } else {
                            setSelectedLevel('')
                            setSelectedClassrooms([])
                            setSelectedStudents([])
                        }
                    }} 
                    className={`${selectedLevel === 'C' ? 'bg-purple-500 text-slate-50' : 'dark:bg-gray-500 bg-gray-300'} py-2 rounded-2xl cursor-pointer hover:bg-purple-600 hover:text-slate-50 transition-all duration-300`}
                >Clase</p>
                <p
                    onClick={() => {
                        if (selectedLevel === '') {
                            setSelectedLevel('P')
                        } else {
                            setSelectedLevel('')
                            setSelectedClassrooms([])
                            setSelectedStudents([])
                        }
                    }} 
                    className={`${selectedLevel === 'P' ? 'bg-cyan-600 text-slate-50' : 'dark:bg-gray-500 bg-gray-300'} py-2 rounded-2xl cursor-pointer hover:bg-cyan-700 hover:text-slate-50 transition-all duration-300`}
                >Estudiantes</p>
            </div>
        </div>
        {selectedLevel === 'C' && <ClassroomsSelector classrooms={classrooms} selectedClassrooms={selectedClassrooms} setSelectedClassrooms={setSelectedClassrooms} />}
        {selectedLevel === 'P' && 
        <>      
                {selectedStudents.length > 0 && 
                <>
                    <h2 className="text-xl font-bold">Alumnos Seleccionados</h2>
                    {selectedStudents.map(student => (
                        <p key={student.uid} className="rounded-xl px-4 bg-green-600 text-slate-50 transition-all duration-300">{student.first_name} {student.last_name}</p>
                    ))}
                </>} 
                <div 
                    className="w-full h-full flex justify-center items-center gap-12">
                    <Input 
                        placeholder="Buscar por nombre, apellido o DNI ..."
                        onChange={(e) => {
                            name && setNameError('')
                            setName(e.target.value)
                        }}
                        error={nameError}
                    />
        
                </div>
            {name && <StudentSelector name={name} color="bg-blue-700" selectedStudents={selectedStudents} setSelectedStudents={setSelectedStudents} />}
        </>}
        <button className="bg-blue-500 text-white py-2 rounded-2xl hover:bg-blue-600 transition-all duration-300">Crear Anuncio</button>
    </form>
  )
}

export default AnnouncementAdminForm