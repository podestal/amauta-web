import { useState } from "react"
import { Assignature } from "../../../services/api/assignatureService"
import Input from "../../ui/Input"
import useSchoolStore from "../../../hooks/store/useSchoolStore"
import useAuthStore from "../../../hooks/store/useAuthStore"
import useGetInstructors from "../../../hooks/api/instructor/useGetInstructors"
import SearchableDropdownInput, { Option } from "../../ui/SearchableDropdownInput"
import { areas } from "../../../data/mockdataForGrades"
import { motion } from "framer-motion"
import Button from "../../ui/Button"
import useNotificationsStore from "../../../hooks/store/useNotificationsStore"
import { UseMutationResult } from "@tanstack/react-query"
import { CreateAssignatureData } from "../../../hooks/api/assignature/useCreateAssignature"
import getInstructorFullName from "../../../utils/getInstructorFullName"
import { UpdateAssignatureData } from "../../../hooks/api/assignature/useUpdateAssignature"

interface Props {
    classroomId: number
    assignature?: Assignature
    createAssignature?: UseMutationResult<Assignature, Error, CreateAssignatureData>
    updateAssignature?: UseMutationResult<Assignature, Error, UpdateAssignatureData>
}

const AssignatureForm = ({ classroomId, assignature, createAssignature, updateAssignature }: Props) => {

    const school = useSchoolStore(s => s.school)
    const access = useAuthStore(s => s.access) || ''
    const { setMessage, setShow, setType } = useNotificationsStore()

    const [title, setTitle] = useState(assignature ? assignature.title : '')
    const [selectedInstructor, setSelectedInstructor] = useState<Option | null>(assignature ? {id: assignature.instructor, label: ''} : null)
    const [selectedArea, setSelectedArea] = useState(assignature ? assignature.area : 0)


    // ERROR HANDLING
    const [titleError, setTitleError] = useState('')

    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault()


        

        if (!title) {
            setTitleError('Este campo es requerido')
            return
        }

        if (title.length < 2) {
            setTitleError('El título debe tener al menos 2 caracteres')
            return
        }

        if (!selectedInstructor) {
            setShow(true)
            setType('error')
            setMessage('Debe seleccionar un instructor')
            return
        }

        if (selectedArea <= 0) {
            setShow(true)
            setType('error')
            setMessage('Debe seleccionar un área')
            return
        }
        console.log('submitting form');

        createAssignature && createAssignature.mutate({
            access,
            assignature: {
                title,
                clase: classroomId,
                instructor: selectedInstructor.id,
                area: selectedArea
            }
        }, {
            onSuccess: () => {
                setShow(true)
                setType('success')
                setMessage('Curso creado exitosamente')
                setTitle('')
                setSelectedInstructor(null)
                setSelectedArea(0)
            },
            onError: (error) => {
                setShow(true)
                setType('error')
                setMessage(`Error al crear el curso: ${error.message}`)
            }
        })

        console.log('selectedInstructor.id', selectedInstructor.id);
        

        updateAssignature && updateAssignature.mutate({
            access,
            assignatureUpdates: {
                title,
                clase: classroomId,
                instructor: selectedInstructor.id,
                area: selectedArea
            }
        }, {
            onSuccess: () => {
                setShow(true)
                setType('success')
                setMessage('Curso actualizado exitosamente')
            },
            onError: (error) => {
                setShow(true)
                setType('error')
                setMessage(`Error al actualizar el curso: ${error.message}`)
            }
        })

        e.preventDefault()
    }

    // const toggleClassroom = (id: number) => {
    //     setSelectedArea((prev) =>
    //         prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    //     );
    // }

    const { data: instructors, isLoading: isInstructorsLoading, isError: isInstructorsError, error: instructorsError, isSuccess: isInstructorsSuccess } = useGetInstructors({ access, school: (school.id).toString() })

    if (isInstructorsLoading) return <p className='text-center animate-pulse text-xs my-4'>Cargando Instructores...</p>
    if (isInstructorsError) return <p className='text-center text-red-500 text-xs my-4'>Error: {instructorsError.message}</p>

    if (isInstructorsSuccess)

  return (
    <form
        onSubmit={handleSubmit}
        className=" p-6 space-y-4 w-full flex flex-col items-center gap-4"
    >
        <h2 className="text-2xl font-bold">{assignature ? 'Editar Curso' : 'Nuevo Curso'}</h2>
        {/* <p>{classroomId}</p> */}
        {/* title = models.CharField(max_length=255)
    clase =  models.ForeignKey(Clase, on_delete=models.CASCADE, related_name='assignatures')
    instructor = models.ForeignKey(Instructor, on_delete=models.SET_NULL, blank=True, null=True, related_name='assignatures')
    area = models.ForeignKey(Area, on_delete=models.CASCADE) */}
        <Input 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ingrese el título del curso"
            error={titleError}
            setError={setTitleError}
            label="Título del Curso"
        />
        <div className="w-full">
            <p className="text-lg lg:text-xl dark:text-slate-50 text-center mb-4">Selecciona un Profesor</p>
            <SearchableDropdownInput 
                options={instructors.map(instructor => ({ id: instructor.id, label: `${instructor.first_name} ${instructor.last_name}` }))}
                selected={selectedInstructor ? { id: selectedInstructor.id, label: selectedInstructor.label || getInstructorFullName({ instructors, instructorId: assignature?.instructor }) } : null}
                setSelected={setSelectedInstructor}
                placeholder="Seleccione un Instructor"
            />
        </div>
        {title && selectedInstructor && 
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
        >
        <p className="text-lg lg:text-xl dark:text-slate-50 text-center mb-6">Selecciona un Area</p>
        {areas
            .map((area) => (
            <motion.button
                key={area.id}
                type="button"
                onClick={() => {
                    if (selectedArea === area.id) {
                        setSelectedArea(0)
                    }
                    else {
                        setSelectedArea(area.id)
                    }
                }}
                disabled={selectedArea > 0 && selectedArea !== area.id}
                className={`px-3 py-1 text-sm rounded-full transition-all duration-300 m-2 ${
                selectedArea === area.id
                    ? "bg-blue-700 text-white"
                    : "dark:bg-gray-700 bg-slate-300 dark:text-gray-300 hover:bg-blue-600 hover:text-white"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                exit={{ opacity: 0, scale: 0.8 }}
            >
                {area.title}
            </motion.button>
        ))}
        </motion.div>}
        {title && selectedInstructor && selectedArea > 0 &&
        <motion.div
            className="w-full flex justify-center mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
        >
            <Button 
                label={assignature ? 'Actualizar Curso' : 'Crear Curso'}
                type="submit"
            />
        </motion.div>}
    </form>
  )
}

export default AssignatureForm