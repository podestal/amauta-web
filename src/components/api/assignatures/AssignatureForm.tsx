import { Assignature } from "../../../services/api/assignatureService"

interface Props {
    classroomId: number
    assignature?: Assignature
}

const AssignatureForm = ({ classroomId, assignature }: Props) => {
  return (
    <form>
        <h2>{assignature ? 'Editar Curso' : 'Nuevo Curso'}</h2>
        <p>{classroomId}</p>
    </form>
  )
}

export default AssignatureForm