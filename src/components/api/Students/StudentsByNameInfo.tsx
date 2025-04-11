import useGetStudentsByName from "../../../hooks/api/student/useGetStudentsByName"
import useAuthStore from "../../../hooks/store/useAuthStore"
import { Classroom } from "../../../services/api/classroomService"
import StudentAdminCard from "./StudentAdminCard"

interface Props {
    name: string
    school: number
    classrooms: Classroom[]
    classroomId: string
    showIcons?: boolean
}

const StudentsByNameInfo = ({ name, school, classrooms, classroomId, showIcons=false }: Props) => {

    const access = useAuthStore(s => s.access) || ''

    const { data: students, isLoading, isError, error, isSuccess } = useGetStudentsByName({ access, name, school: school.toString() })

    if (isLoading) return <p className="animate-pulse text-2xl text-center py-20">Un Momento ...</p>

    if (isError) return <p>Error {error.message}</p>

    if (isSuccess)

  return (
    <>
            <div className="w-full grid grid-cols-10 text-lg font-bold gap-6 px-6 py-3 lg:bg-gray-900 rounded-t-xl max-lg:hidden">
                <p className="col-span-3">Nombres y Apellidos</p>
                <p>Información Personal</p>
                <p>Información Nacimiento</p>
                <p>Información Salud</p>
                <p>Contacto Emergencia</p>
                <p>Información Padre</p>
                <p>Información Madre</p>
                <p>Información Apoderado</p>
            </div>
            {students.map(student => (
                <StudentAdminCard 
                    student={student}
                    classrooms={classrooms}
                    classroomId={classroomId}
                    studentName={name}
                    showIcons={showIcons}
                />
            ))}
    </>
  )
}

export default StudentsByNameInfo