import { Instructor } from "../services/api/instructorService"

interface Props {
    instructors: Instructor[]
    instructorId?: number
}

const getInstructorFullName = ({  instructors, instructorId }: Props): string => {

    if (!instructorId || !instructors || instructors.length === 0) {
        return ''
    }

    const instructor = instructors.find((instructor) => instructor.id === instructorId)

    if (!instructor) {
        return ''
    }

    const fullName = `${instructor.first_name} ${instructor.last_name}`

    return fullName
}
export default getInstructorFullName