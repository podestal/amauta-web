import ClassroomForm from "./ClassroomForm"

interface Props {
    level: string
}

const CreateClassroom = ({ level }: Props) => {
  return (
    <ClassroomForm 
        level={level}
    />
  )
}

export default CreateClassroom