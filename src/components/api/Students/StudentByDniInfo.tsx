import useGetStudentByDni from "../../../hooks/api/student/useGetStudentByDni"
import useAuthStore from "../../../hooks/store/useAuthStore"
import { Classroom } from "../../../services/api/classroomService"
import StudentAdminCard from "./StudentAdminCard"

interface Props {
    studentDni: string
    classrooms: Classroom[]
    classroomId: string
}

const StudentByDniInfo = ({ studentDni, classrooms, classroomId }: Props) => {

    const access = useAuthStore (s => s.access) || ''
    const { data: student, isLoading, isError, error, isSuccess } = useGetStudentByDni({ dni: studentDni, access })

    if (isLoading) return <p className="animate-pulse text-2xl text-center py-20">Un Momento ...</p>

    if (isError) return <p>Error {error.message}</p>

    if (isSuccess)

  return (
    <>
        <div className="w-full grid grid-cols-10 text-lg font-bold gap-6 px-6 py-3 bg-gray-900 rounded-t-xl">
          <p className="col-span-3">Nombres y Apellidos</p>
          <p>Información Personal</p>
          <p>Información Nacimiento</p>
          <p>Información Salud</p>
          <p>Contacto Emergencia</p>
          <p>Información Padre</p>
          <p>Información Madre</p>
          <p>Información Apoderado</p>
      </div>
        <StudentAdminCard 
            student={student}
            classrooms={classrooms}
            classroomId={classroomId}
            studentDni={studentDni}
        />
    </>
  )
}

export default StudentByDniInfo