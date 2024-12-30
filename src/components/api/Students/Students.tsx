import { Instructor } from "../../../services/api/instructorService"

interface Props {
    classroom?: string
    instructor?: Instructor
}

const Students = ({ classroom, instructor }: Props) => {

    const classroomId = instructor && instructor.clases_details[0].split('-').pop()

  return (
    <div>
        {/* {console.log('classroom', classroom)} */}
        <p>{classroomId}</p>
        <p>{classroom}</p>
    </div>
  )
}

export default Students