import { UseQueryResult, useQuery } from "@tanstack/react-query"
import getStudentService, { Student } from "../../../services/api/studentsService"

interface Props {
    access: string
    studentId: string
}

const useRetrieveStudent = ({ access, studentId }: Props): UseQueryResult<Student, Error> => {
    
    const studentService = getStudentService({studentId})

    return useQuery({
        queryKey: [`student ${studentId}`],
        queryFn: () => studentService.get(access),
    })
}

export default useRetrieveStudent