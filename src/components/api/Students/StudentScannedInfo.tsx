import useRetrieveStudent from "../../../hooks/api/student/useRetrieveStudent"
import useAuthStore from "../../../hooks/store/useAuthStore"
import StudentInfo from "./StudentInfo"

interface Props {
    studentId: string
}

const StudentScannedInfo = ({ studentId }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const { data: student, isLoading, isError, error, isSuccess } = useRetrieveStudent({ access, studentId })

    if (isLoading) return <p className="animate-pulse text-center text-2xl">Un momento ...</p>
    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess)

  return (
    <StudentInfo 
        student={student} 
    />
  )
}

export default StudentScannedInfo