import { Classroom } from "../../../../services/api/classroomService"
import Selector from "../../../ui/Selector"

interface Props {
    setSelectedClassroom: (status: string) => void
    selectedClassroom: string
    classrooms: Classroom[]
}

const ClasroomSelector = ({ selectedClassroom, setSelectedClassroom, classrooms }: Props) => {
    
  return (
    <div>
        <Selector 
            values={classrooms.map(classroom => ({ id: classroom.id.toString(), name:classroom.section }))}
            setter={setSelectedClassroom}
            defaultValue={selectedClassroom}
            label="Sección"
        />
    </div>
  )
}

export default ClasroomSelector