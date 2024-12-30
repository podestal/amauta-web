import { UseQueryResult, useQuery } from "@tanstack/react-query"
import studentsService, { Student } from "../../../services/api/studentsService"
import { getStudentsCacheKey } from "../../../utils/cacheKeys"

interface Props {
    access: string
    classroomId: string
}

const useGetStudents = ({ access, classroomId }: Props): UseQueryResult<Student[], Error> => {

    const STUDENT_CACHE_KEY = getStudentsCacheKey(classroomId)

    return useQuery({
        queryKey: STUDENT_CACHE_KEY,
        queryFn: () => studentsService.get(access, classroomId)
    })
}

export default useGetStudents