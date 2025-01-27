import { useState } from "react"
import StudentForm from "./StudentForm"

const CreateStudent = () => {

  const [page, setPage] = useState(1)

  return (
    <div className="pt-12">
      <h2 className="text-4xl mb-16 text-center font-bold">Ficha de Inscripción</h2>
      {page === 1 && <StudentForm 
        setPage={setPage}
      />}
      {page === 2 && <p>Page 2</p>}
    </div>
  )
}

export default CreateStudent