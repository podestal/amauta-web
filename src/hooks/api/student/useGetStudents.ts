import { UseQueryResult, useQuery } from "@tanstack/react-query"
import getStudentService, { Student } from "../../../services/api/studentsService"
import { getStudentsCacheKey } from "../../../utils/cacheKeys"

interface Props {
    access: string
    classroomId?: string
    tutor?: boolean
}

const useGetStudents = ({ access, classroomId, tutor }: Props): UseQueryResult<Student[], Error> => {

    const studentService = getStudentService({ tutor })
    const STUDENT_CACHE_KEY = getStudentsCacheKey(classroomId || 'tutor')
    const params = {classroom: classroomId || ''} 

    return useQuery({
        queryKey: STUDENT_CACHE_KEY,
        queryFn: () => classroomId ? studentService.get(access, params) : studentService.get(access),
    })
}

export default useGetStudents