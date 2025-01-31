import { useState } from "react"
import StudentForm from "./forms/StudentForm"
import useGetClassroom from "../../../hooks/api/classroom/useGetClassroom"
import useAuthStore from "../../../hooks/store/useAuthStore"
import useLoader from "../../../hooks/ui/useLoader"

const CreateStudent = () => {

  const access = useAuthStore(s => s.access) || ''
  const {data: classrooms, isLoading, isError, error, isSuccess} = useGetClassroom({access})
  const [page, setPage] = useState(1)

  useLoader(isLoading)

  if (isError) return <p>Error: {error.message}</p>

  if (isSuccess)

  return (
    <div className="pt-12">
      <h2 className="text-4xl mb-16 text-center font-bold">Ficha de Inscripción</h2>
      {page === 1 && 
      <StudentForm 
        setPage={setPage}
        classrooms={classrooms}
      />}
      {page === 2 && <p>Page 2</p>}
    </div>
  )
}

export default CreateStudent