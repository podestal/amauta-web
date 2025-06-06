import SchoolForm from "./SchoolForm"
import { School } from "../../../services/api/schoolService"
import useUpdateSchool from "../../../hooks/api/school/useUpdateSchool"

interface Props {
    school: School
}

const SchoolAdmin = ({ school }: Props) => {

    const updateSchool = useUpdateSchool({ schoolId: school.id })

  return (
    <SchoolForm 
        school={school}
        updateSchool={updateSchool}
    />
  )
}

export default SchoolAdmin