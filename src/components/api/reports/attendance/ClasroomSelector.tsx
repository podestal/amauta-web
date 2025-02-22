import { Classroom } from "../../../../services/api/classroomService"
import Selector from "../../../ui/Selector"

interface Props {
    setSelectedClassroom: (status: string) => void
    classrooms: Classroom[]
}

const ClasroomSelector = ({ setSelectedClassroom, classrooms }: Props) => {
    
  return (
    <div>
        <Selector 
            values={classrooms.map(classroom => ({ id: classroom.id.toString(), name:`${classroom.section === 'U' ? 'Unica' : classroom.section}` }))}
            setter={setSelectedClassroom}
            label="Sección"
        />
    </div>
  )
}

export default ClasroomSelector