import { useState } from "react"
import useGetStudents from "../../../hooks/api/student/useGetStudents"
import useAuthStore from "../../../hooks/store/useAuthStore"
import useLoader from "../../../hooks/ui/useLoader"
import StudentAdminCard from "./StudentAdminCard"
import Input from "../../ui/Input"
import Button from "../../ui/Button"
import Modal from "../../ui/Modal"
import CreateStudent from "./CreateStudent"

const StudentsAdmin = () => {

    const access = useAuthStore(s => s.access) || ''
    const [open, setOpen] = useState(false)
    const [studentFilter, setStudentFilter] = useState('')
    const { data: students, isLoading, isError, error, isSuccess } = useGetStudents({ access, all: true })

    useLoader(isLoading)

    if (isError) return <p>Error {error.message}</p>

    if (isSuccess)

  return (
    <>
    <div className="pt-10 pb-20 flex flex-col gap-8 justify-center items-center">
        <div className="w-full flex justify-between items-start gap-4">
            <h2 className="text-5xl font-bold">Alumnos</h2>
            <div>
                <Button 
                    label="Nuevo alumno"
                    onClick={() => setOpen(true)}
                />
            </div>
        </div>
        <Input 
            value={studentFilter}
            onChange={e => {
                setStudentFilter(e.target.value)
            }}
            placeholder="Buscar por nombre"
        />
        <div className="w-full grid grid-cols-7 text-lg font-bold gap-6">
            <p className=" col-span-3">Nombres y Apellidos</p>
            <p>Datos Personales</p>
            <p className="">Información de nacimiento</p>
            <p className="">Información de salud</p>
            <p className="">Contacto de emergencia</p>
        </div>
        <div className="w-full flex flex-col gap-2">
            {students
                .filter( student => `${student.first_name.toLowerCase()}${student.last_name.toLowerCase()}`.includes(studentFilter.toLowerCase()))
                .map( student => (
                <StudentAdminCard 
                    key={student.uid}
                    student={student}
                />
            ))}
        </div>
    </div>
    <Modal 
        isOpen={open}
        onClose={() => setOpen(false)}
        whole
    >
        <CreateStudent />
    </Modal>
    </>
  )
}

export default StudentsAdmin