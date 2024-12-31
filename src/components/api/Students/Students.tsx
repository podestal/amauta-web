import { useState } from "react"
import useGetStudents from "../../../hooks/api/student/useGetStudents"
import useAuthStore from "../../../hooks/store/useAuthStore"
import StudentCard from "./StudentCard"
import StudentFilter from "./StudentFilter"

interface Props {
    classroom?: string
    instructor: string
}

const Students = ({ classroom, instructor }: Props) => {

    const [filter, setFilter] = useState('')
    const access = useAuthStore(s => s.access) || ''
    const classroomId = classroom ? classroom : ''
    const {data: students, isLoading, isError, error, isSuccess} = useGetStudents({ access, classroomId })

    if (isLoading) return <p>loading ....</p>

    if (isError) return <p>Error {error.message}</p>

    if (isSuccess)

  return (
    <div className="pt-10">
        <h2 className="text-2xl text-center">Alumnos</h2>
        <StudentFilter 
            filter={filter}
            setFilter={setFilter}
        />
        {students
            .filter( student => `${student.first_name.toLowerCase()}${student.last_name.toLowerCase()}`.includes(filter.toLowerCase()))
            .map( student => (
            <StudentCard 
                key={student.id}
                student={student}
                instructor={instructor}
            />
        ))}
    </div>
  )
}

export default Students