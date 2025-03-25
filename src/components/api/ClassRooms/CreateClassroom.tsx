import useCreateClassroom from "../../../hooks/api/classroom/useCreateClassroom"
import { Classroom } from "../../../services/api/classroomService"
import ClassroomForm from "./ClassroomForm"

interface Props {
    level: string
    classrooms: Classroom[]
}

const CreateClassroom = ({ level, classrooms }: Props) => {

    const createClassroom = useCreateClassroom()

  return (
    <ClassroomForm 
        level={level}
        createClassroom={createClassroom}
        classrooms={classrooms}
    />
  )
}

export default CreateClassroom