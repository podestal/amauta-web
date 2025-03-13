import useCreateClassroom from "../../../hooks/api/classroom/useCreateClassroom"
import ClassroomForm from "./ClassroomForm"

interface Props {
    level: string
}

const CreateClassroom = ({ level }: Props) => {

    const createClassroom = useCreateClassroom()

  return (
    <ClassroomForm 
        level={level}
        createClassroom={createClassroom}
    />
  )
}

export default CreateClassroom